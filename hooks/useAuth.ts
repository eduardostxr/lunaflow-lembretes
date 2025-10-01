import { useState } from "react";
import { Alert } from "react-native";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const register = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha email e senha");
      return false;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      return true;
    } catch (error: any) {
      Alert.alert("Erro ao criar conta", error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      Alert.alert("Erro", "Digite email e senha");
      return false;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error: any) {
      let message = "Erro ao logar";
      switch (error.code) {
        case "auth/invalid-email":
          message = "Email inválido.";
          break;
        case "auth/user-not-found":
          message = "Usuário não encontrado.";
          break;
        case "auth/wrong-password":
          message = "Senha incorreta.";
          break;
      }
      Alert.alert("Erro", message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair.");
    }
  };

  return { register, login, logout, loading };
}
