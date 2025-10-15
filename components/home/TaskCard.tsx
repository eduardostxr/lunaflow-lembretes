import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Task } from "../../types/task";
import { BottomSheet } from "./BottomSheet";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onToggleComplete, 
  onDelete,
  onEdit,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "#dc2626";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getPriorityLabel = () => {
    switch (task.priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Média";
      case "low":
        return "Baixa";
      default:
        return "Normal";
    }
  };

  const menuOptions = [
    {
      label: "Editar",
      icon: "create-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => onEdit(task),
    },
    {
      label: task.is_completed ? "Marcar como pendente" : "Marcar como concluída",
      icon: (task.is_completed ? "close-circle-outline" : "checkmark-circle-outline") as keyof typeof Ionicons.glyphMap,
      onPress: () => onToggleComplete(task.id),
      color: task.is_completed ? "#f59e0b" : "#10b981",
    },
    {
      label: "Deletar",
      icon: "trash-outline" as keyof typeof Ionicons.glyphMap,
      onPress: () => onDelete(task.id),
      destructive: true,
    },
  ];

  return (
    <>
      <View style={[styles.card, task.is_completed && styles.cardCompleted]}>
        <View style={styles.cardHeader}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onToggleComplete(task.id)}
          >
            <Ionicons
              name={task.is_completed ? "checkmark-circle" : "ellipse-outline"}
              size={28}
              color={task.is_completed ? "#10b981" : "#9ca3af"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cardContent}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.7}
          >
            <View style={styles.titleRow}>
              <Text
                style={[
                  styles.title,
                  task.is_completed && styles.titleCompleted,
                ]}
                numberOfLines={2}
              >
                {task.title}
              </Text>
            </View>

            {/* Descrição - Aparece quando expandido */}
            {isExpanded && task.description && (
              <View style={styles.descriptionContainer}>
                <Ionicons name="document-text-outline" size={14} color="#6b5a4a" />
                <Text style={styles.description}>{task.description}</Text>
              </View>
            )}

            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={14} color="#6b5a4a" />
              <Text style={styles.client}>{task.client_name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={14} color="#6b5a4a" />
              <Text style={styles.dueDate}>
                {new Date(task.due_date).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            {/* Contatos adicionais - Aparecem quando expandido */}
            {isExpanded && (
              <>
                {task.client_email && (
                  <View style={styles.infoRow}>
                    <Ionicons name="mail-outline" size={14} color="#6b5a4a" />
                    <Text style={styles.contactInfo}>{task.client_email}</Text>
                  </View>
                )}
                {task.client_phone && (
                  <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={14} color="#6b5a4a" />
                    <Text style={styles.contactInfo}>{task.client_phone}</Text>
                  </View>
                )}
              </>
            )}

            <View style={styles.footer}>
              <View
                style={[styles.priorityBadge, { backgroundColor: getPriorityColor() }]}
              >
                <Text style={styles.priorityText}>{getPriorityLabel()}</Text>
              </View>

              {/* Indicador de expansão */}
              {task.description && (
                <View style={styles.expandIndicator}>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={16}
                    color="#6b5a4a"
                  />
                  <Text style={styles.expandText}>
                    {isExpanded ? "Ver menos" : "Ver mais"}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setShowMenu(true)}
          >
            <Ionicons name="ellipsis-vertical" size={24} color="#6b5a4a" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        options={menuOptions}
        title={task.title}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e2d6c3",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardCompleted: {
    opacity: 0.6,
    backgroundColor: "#d4c8b5",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3b2a2a",
    flex: 1,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#6b5a4a",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  client: {
    fontSize: 14,
    color: "#6b5a4a",
    marginLeft: 6,
  },
  dueDate: {
    fontSize: 14,
    color: "#6b5a4a",
    marginLeft: 6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  menuButton: {
    padding: 4,
    marginLeft: 8,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#6b5a4a",
  },
  description: {
    fontSize: 13,
    color: "#3b2a2a",
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  contactInfo: {
    fontSize: 13,
    color: "#6b5a4a",
    marginLeft: 6,
  },
  expandIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  expandText: {
    fontSize: 12,
    color: "#6b5a4a",
    marginLeft: 4,
    fontWeight: "500",
  },
});
