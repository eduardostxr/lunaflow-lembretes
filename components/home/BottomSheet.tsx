import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface BottomSheetOption {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color?: string;
  destructive?: boolean;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  options: BottomSheetOption[];
  title?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  options,
  title,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              {title && (
                <>
                  <Text style={styles.title}>{title}</Text>
                  <View style={styles.divider} />
                </>
              )}

              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    option.onPress();
                    onClose();
                  }}
                >
                  <Ionicons
                    name={option.icon}
                    size={24}
                    color={option.color || (option.destructive ? "#dc2626" : "#3b2a2a")}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      option.destructive && styles.destructiveText,
                      option.color && { color: option.color },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <View style={styles.divider} />

              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#f5f3e7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3b2a2a",
    textAlign: "center",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#d1c5b3",
    marginVertical: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#3b2a2a",
    marginLeft: 16,
    fontWeight: "500",
  },
  destructiveText: {
    color: "#dc2626",
  },
  cancelButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    color: "#6b5a4a",
    fontWeight: "600",
  },
});
