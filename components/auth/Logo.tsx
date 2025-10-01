import React from "react";
import { Image, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../../assets/images/luna-logo.png")}
      style={styles.logo}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center",
  },
});
