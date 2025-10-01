import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

import ButtonPrimary from "../../components/auth/ButtonPrimary";
import InputField from "../../components/auth/InputField";
import Logo from "../../components/auth/Logo";
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
      router.replace("/home");
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Login</Text>

      <InputField placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <InputField placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

      <ButtonPrimary title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} />
    </View>
  );
}
