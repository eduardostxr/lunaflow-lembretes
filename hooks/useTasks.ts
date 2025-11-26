import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as reminderService from "../services/reminders";
import { Reminder, Task } from "../types/task";
import { getTodaysTasks } from "../utils/taskUtils";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar reminders do banco ao inicializar
  useEffect(() => {
    loadReminders();
  }, []);

  // Polling: Recarregar reminders a cada 30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      loadReminders();
    }, 30000); // 30 segundos

    return () => clearInterval(interval); // Limpar ao desmontar
  }, []);

  const loadReminders = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);
      const data = await reminderService.getAllReminders();
      setReminders(data);
      
      // Converter reminders para tasks para compatibilidade com componentes existentes
      const tasksFromReminders: Task[] = data.map(r => convertReminderToTask(r));
      setTasks(tasksFromReminders);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar lembretes';
      setError(errorMessage);
      if (!silent) {
        Alert.alert('Erro', errorMessage);
      }
      console.error('Error loading reminders:', err);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  // Função para converter Reminder para Task (compatibilidade)
  const convertReminderToTask = (reminder: Reminder): Task => ({
    id: reminder.id,
    title: reminder.title,
    description: reminder.description || '',
    client_name: reminder.contactId, // Temporário - idealmente buscar do contato
    client_email: '',
    client_phone: '',
    due_date: reminder.dueDate,
    is_completed: reminder.completed,
    completed_at: reminder.completedAt || undefined,
    priority: 'medium', // Não existe no banco, valor padrão
    created_at: reminder.createdAt,
    updated_at: reminder.createdAt,
  });

  const todaysTasks = getTodaysTasks(tasks);
  const incompleteTasks = todaysTasks.filter((t) => !t.is_completed);
  const completedTasks = todaysTasks.filter((t) => t.is_completed);

  const toggleComplete = useCallback(async (taskId: number) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const newCompletedStatus = !task.is_completed;
      
      // Atualizar no banco
      await reminderService.toggleReminderComplete(taskId, newCompletedStatus);
      
      // Atualizar estado local
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                is_completed: newCompletedStatus,
                completed_at: newCompletedStatus ? new Date().toISOString() : undefined,
                updated_at: new Date().toISOString(),
              }
            : t
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar lembrete';
      Alert.alert('Erro', errorMessage);
      console.error('Error toggling task:', err);
    }
  }, [tasks]);

  const addTask = useCallback(async (newTask: Partial<Task>) => {
    try {
      setLoading(true);
      
      // Criar reminder no banco
      const newReminder = await reminderService.createReminder({
        contactId: newTask.client_name || 'default', // Ajustar conforme necessário
        title: newTask.title || "",
        description: newTask.description || null,
        dueDate: newTask.due_date || new Date().toISOString(),
        completed: false,
        createdBy: 'user', // Ajustar conforme seu sistema de autenticação
        autoSend: false,
        messageSent: false,
      });

      // Converter para task e adicionar ao estado
      const task = convertReminderToTask(newReminder);
      setTasks((prev) => [...prev, task]);
      setReminders((prev) => [...prev, newReminder]);
      
      Alert.alert("Sucesso", "Lembrete criado com sucesso!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar lembrete';
      Alert.alert('Erro', errorMessage);
      console.error('Error adding task:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (updatedTask: Partial<Task>) => {
    if (!updatedTask.id) return;

    try {
      setLoading(true);
      
      // Atualizar no banco
      const updated = await reminderService.updateReminder(updatedTask.id, {
        title: updatedTask.title,
        description: updatedTask.description || null,
        dueDate: updatedTask.due_date,
        completed: updatedTask.is_completed,
        completedAt: updatedTask.completed_at || null,
      });

      // Atualizar estado local
      const task = convertReminderToTask(updated);
      setTasks((prev) =>
        prev.map((t) => t.id === updatedTask.id ? task : t)
      );
      setReminders((prev) =>
        prev.map((r) => r.id === updated.id ? updated : r)
      );
      
      Alert.alert("Sucesso", "Lembrete atualizado com sucesso!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar lembrete';
      Alert.alert('Erro', errorMessage);
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback((taskId: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja deletar este lembrete?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              
              // Deletar do banco
              await reminderService.deleteReminder(taskId);
              
              // Remover do estado local
              setTasks((prev) => prev.filter((t) => t.id !== taskId));
              setReminders((prev) => prev.filter((r) => r.id !== taskId));
              
              Alert.alert("Sucesso", "Lembrete deletado com sucesso!");
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar lembrete';
              Alert.alert('Erro', errorMessage);
              console.error('Error deleting task:', err);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }, []);

  const saveTask = useCallback((task: Partial<Task>) => {
    if (task.id) {
      updateTask(task);
    } else {
      addTask(task);
    }
  }, [addTask, updateTask]);

  return {
    tasks,
    reminders,
    todaysTasks,
    incompleteTasks,
    completedTasks,
    loading,
    error,
    toggleComplete,
    addTask,
    updateTask,
    deleteTask,
    saveTask,
    refreshReminders: loadReminders,
  };
}
