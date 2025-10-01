import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonPrimaryProps {
  title: string;
  onPress: () => void;
}

export default function ButtonPrimary({ title, onPress }: ButtonPrimaryProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#8C3432",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
