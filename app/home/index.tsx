import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";
import { AddTaskModal } from "../../components/Home/AddTaskModal";
import { TaskCard } from "../../components/Home/TaskCard";
import { useAuth } from "../../hooks/useAuth";
import { useTasks } from "../../hooks/useTasks";
import { styles } from "../../styles/home.styles";
import { Task } from "../../types/task";

export default function Home() {
  const router = useRouter();
  const { logout } = useAuth();
  const { 
    todaysTasks, 
    incompleteTasks, 
    completedTasks, 
    toggleComplete,
    deleteTask,
    saveTask,
  } = useTasks();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const statsOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const statsHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 0],
    extrapolate: 'clamp',
  });

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/Auth");
          },
        },
      ]
    );
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingTask(null);
  };

  const handleSaveTask = (task: Partial<Task>) => {
    saveTask(task);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>Lembretes</Text>
          <Text style={styles.subHeader}>Tarefas de Hoje</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="#dc2626" />
        </TouchableOpacity>
      </View>

      <Animated.View 
        style={[
          styles.statsContainer,
          {
            opacity: statsOpacity,
            height: statsHeight,
            overflow: 'hidden',
          }
        ]}
      >
        <View style={styles.statCard}>
          <Ionicons name="list-outline" size={24} color="#6b5a4a" />
          <Text style={styles.statNumber}>{todaysTasks.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="time-outline" size={24} color="#f59e0b" />
          <Text style={styles.statNumber}>{incompleteTasks.length}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#10b981" />
          <Text style={styles.statNumber}>{completedTasks.length}</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.taskList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.taskListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {todaysTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#d1c5b3" />
            <Text style={styles.emptyStateText}>Nenhuma tarefa para hoje</Text>
            <Text style={styles.emptyStateSubtext}>
              Adicione um novo lembrete para começar
            </Text>
          </View>
        ) : (
          <>
            {incompleteTasks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Pendentes ({incompleteTasks.length})
                </Text>
                {incompleteTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </View>
            )}

            {completedTasks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Concluídas ({completedTasks.length})
                </Text>
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={toggleComplete}
                    onDelete={deleteTask}
                    onEdit={handleEditTask}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </Animated.ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <AddTaskModal
        visible={showAddModal}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />
    </View>
  );
}
