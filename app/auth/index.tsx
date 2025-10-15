import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";

import ButtonPrimary from "../../components/Auth/ButtonPrimary";
import InputField from "../../components/Auth/InputField";
import Logo from "../../components/Auth/Logo";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "../../styles/login.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace("/Home");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Logo />
          <Text style={styles.title}>Bem-vindo ao LunaFlow</Text>
          <Text style={styles.subtitle}>Gerencie seus lembretes com facilidade</Text>

          <View style={styles.form}>
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <InputField
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <ButtonPrimary
              title={loading ? "Entrando..." : "Entrar"}
              onPress={handleLogin}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
