import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";
import { Alert } from "react-native";
import { removeAuthData, saveAuthData } from "../services/auth";
import { auth } from "../services/firebase";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      Alert.alert("Erro", "Digite email e senha");
      return false;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Salvar dados de autenticação no AsyncStorage
      await saveAuthData(userCredential.user.uid, userCredential.user.email);
      
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
      // Remover dados salvos do AsyncStorage
      await removeAuthData();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair.");
    }
  };

  return { login, logout, loading };
}
