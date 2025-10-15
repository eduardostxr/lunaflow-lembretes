import { useCallback, useState } from "react";
import { Alert } from "react-native";
import remindersData from "../db.json";
import { Task } from "../types/task";
import { getTodaysTasks } from "../utils/taskUtils";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(remindersData.reminder as Task[]);

  const todaysTasks = getTodaysTasks(tasks);
  const incompleteTasks = todaysTasks.filter((t) => !t.is_completed);
  const completedTasks = todaysTasks.filter((t) => t.is_completed);

  const toggleComplete = useCallback((taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              is_completed: !t.is_completed,
              completed_at: !t.is_completed ? new Date().toISOString() : undefined,
              updated_at: new Date().toISOString(),
            }
          : t
      )
    );
  }, []);

  const addTask = useCallback((newTask: Partial<Task>) => {
    const task: Task = {
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      title: newTask.title || "",
      description: newTask.description || "",
      client_name: newTask.client_name || "",
      client_email: newTask.client_email || "",
      client_phone: newTask.client_phone || "",
      due_date: newTask.due_date || new Date().toISOString(),
      is_completed: false,
      priority: newTask.priority || "medium",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, task]);
    Alert.alert("Sucesso", "Lembrete criado com sucesso!");
  }, [tasks]);

  const updateTask = useCallback((updatedTask: Partial<Task>) => {
    if (!updatedTask.id) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === updatedTask.id
          ? { ...t, ...updatedTask, updated_at: new Date().toISOString() }
          : t
      )
    );
    Alert.alert("Sucesso", "Lembrete atualizado com sucesso!");
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
          onPress: () => {
            setTasks((prev) => prev.filter((t) => t.id !== taskId));
            Alert.alert("Sucesso", "Lembrete deletado com sucesso!");
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
    todaysTasks,
    incompleteTasks,
    completedTasks,
    toggleComplete,
    addTask,
    updateTask,
    deleteTask,
    saveTask,
  };
}
