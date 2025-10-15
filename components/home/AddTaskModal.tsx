import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Task } from "../../types/task";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  editingTask?: Task | null;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onClose,
  onSave,
  editingTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [tempDate, setTempDate] = useState(new Date());
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setClientName(editingTask.client_name);
      setClientEmail(editingTask.client_email);
      setClientPhone(editingTask.client_phone);
      setPriority(editingTask.priority);
      setSelectedDate(new Date(editingTask.due_date));
    } else {
      resetForm();
    }
  }, [editingTask, visible]);

  // Máscara para telefone (11) 99999-9999
  const formatPhone = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    
    if (cleaned.length <= 10) {
      let formatted = cleaned;
      if (cleaned.length >= 2) {
        formatted = '(' + cleaned.slice(0, 2) + ') ' + cleaned.slice(2);
      }
      if (cleaned.length >= 6) {
        formatted = '(' + cleaned.slice(0, 2) + ') ' + cleaned.slice(2, 6) + '-' + cleaned.slice(6, 10);
      }
      return formatted;
    } else {
      let formatted = '(' + cleaned.slice(0, 2) + ') ' + cleaned.slice(2, 7) + '-' + cleaned.slice(7, 11);
      return formatted;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhone(text);
    setClientPhone(formatted);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setSelectedDate(new Date());
    setPriority("medium");
  };

  const formatDateDisplay = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTimeDisplay = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const openDatePicker = () => {
    setTempDate(new Date(selectedDate));
    setPickerMode("date");
    setShowDateTimePicker(true);
  };

  const openTimePicker = () => {
    setTempDate(new Date(selectedDate));
    setPickerMode("time");
    setShowDateTimePicker(true);
  };

  const onPickerChange = (event: any, date?: Date) => {
    if (date) {
      setTempDate(date);
    }
  };

  const confirmPicker = () => {
    if (pickerMode === "date") {
      const newDate = new Date(selectedDate);
      newDate.setFullYear(tempDate.getFullYear());
      newDate.setMonth(tempDate.getMonth());
      newDate.setDate(tempDate.getDate());
      setSelectedDate(newDate);
    } else {
      const newDate = new Date(selectedDate);
      newDate.setHours(tempDate.getHours());
      newDate.setMinutes(tempDate.getMinutes());
      setSelectedDate(newDate);
    }
    setShowDateTimePicker(false);
  };

  const cancelPicker = () => {
    setShowDateTimePicker(false);
  };

  const handleSave = () => {
    // Validações
    if (!title.trim()) {
      Alert.alert("Erro", "O título é obrigatório");
      return;
    }
    if (!clientName.trim()) {
      Alert.alert("Erro", "O nome do cliente é obrigatório");
      return;
    }

    const dueDateISO = selectedDate.toISOString();

    const taskData: Partial<Task> = {
      title: title.trim(),
      description: description.trim(),
      client_name: clientName.trim(),
      client_email: clientEmail.trim(),
      client_phone: clientPhone.trim(),
      due_date: dueDateISO,
      priority,
      ...(editingTask && { id: editingTask.id }),
    };

    onSave(taskData);
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={28} color="#3b2a2a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editingTask ? "Editar Lembrete" : "Novo Lembrete"}
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Ligar para o cliente"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Detalhes do lembrete..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Nome do Cliente *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: João Silva"
              value={clientName}
              onChangeText={setClientName}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Email do Cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="cliente@email.com"
              value={clientEmail}
              onChangeText={setClientEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Telefone do Cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="(11) 99999-9999"
              value={clientPhone}
              onChangeText={handlePhoneChange}
              keyboardType="number-pad"
              maxLength={15}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Data *</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={openDatePicker}
            >
              <Ionicons name="calendar-outline" size={20} color="#6b5a4a" />
              <Text style={styles.dateTimeText}>
                {formatDateDisplay(selectedDate)}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#6b5a4a" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Hora *</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={openTimePicker}
            >
              <Ionicons name="time-outline" size={20} color="#6b5a4a" />
              <Text style={styles.dateTimeText}>
                {formatTimeDisplay(selectedDate)}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#6b5a4a" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Prioridade</Text>
            <View style={styles.priorityContainer}>
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "high" && styles.priorityButtonActive,
                  { borderColor: "#dc2626" },
                ]}
                onPress={() => setPriority("high")}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === "high" && { color: "#fff" },
                  ]}
                >
                  Alta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "medium" && styles.priorityButtonActive,
                  { borderColor: "#f59e0b" },
                ]}
                onPress={() => setPriority("medium")}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === "medium" && { color: "#fff" },
                  ]}
                >
                  Média
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "low" && styles.priorityButtonActive,
                  { borderColor: "#10b981" },
                ]}
                onPress={() => setPriority("low")}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === "low" && { color: "#fff" },
                  ]}
                >
                  Baixa
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={showDateTimePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelPicker}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerModal}>
            <Text style={styles.pickerHeader}>
              {pickerMode === "date" ? "Selecione a Data" : "Selecione a Hora"}
            </Text>

            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode={pickerMode}
                display="spinner"
                onChange={onPickerChange}
                locale="pt-BR"
                textColor="#3b2a2a"
                themeVariant="light"
                style={styles.picker}
              />
            </View>

            <View style={styles.pickerButtons}>
              <TouchableOpacity
                style={[styles.pickerButton, styles.cancelButton]}
                onPress={cancelPicker}
              >
                <Text style={[styles.pickerButtonText, styles.cancelButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.pickerButton, styles.confirmButton]}
                onPress={confirmPicker}
              >
                <Text style={[styles.pickerButtonText, styles.confirmButtonText]}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3e7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d1c5b3",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3b2a2a",
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b5a4a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b2a2a",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#3b2a2a",
    borderWidth: 1,
    borderColor: "#d1c5b3",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  priorityButtonActive: {
    backgroundColor: "#6b5a4a",
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b2a2a",
  },
  dateTimeButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d1c5b3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateTimeText: {
    fontSize: 16,
    color: "#3b2a2a",
    flex: 1,
    marginLeft: 12,
    fontWeight: "500",
  },
  dateTimeContent: {
    flex: 1,
    marginLeft: 12,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  dateTimeLabel: {
    fontSize: 12,
    color: "#8b7a6a",
    marginRight: 8,
    width: 40,
  },
  dateTimeValue: {
    fontSize: 14,
    color: "#3b2a2a",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  pickerModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 380,
    alignItems: "center",
  },
  pickerHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3b2a2a",
    marginBottom: 20,
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 200,
    backgroundColor: "#ffffff",
  },
  pickerButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    width: "100%",
  },
  pickerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#e0d5c7",
  },
  confirmButton: {
    backgroundColor: "#6b5a4a",
  },
  pickerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#3b2a2a",
  },
  confirmButtonText: {
    color: "#fff",
  },
});

