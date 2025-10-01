import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete }) => {
  return (
    <TouchableOpacity
      style={[styles.card, task.is_completed && { opacity: 0.5 }]}
      onPress={() => onToggleComplete(task.id)}
    >
      <Text style={[styles.title, task.is_completed && { textDecorationLine: "line-through" }]}>
        {task.title}
      </Text>
      <Text style={styles.client}>{task.client_name}</Text>
      <Text style={styles.dueDate}>Prazo: {new Date(task.due_date).toLocaleTimeString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e2d6c3",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  client: { fontSize: 14, marginBottom: 2 },
  dueDate: { fontSize: 12, color: "#555" },
});
