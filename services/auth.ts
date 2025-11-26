import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@lunaflow:auth';

interface AuthData {
  uid: string;
  email: string | null;
  isAuthenticated: boolean;
}

export async function saveAuthData(uid: string, email: string | null) {
  try {
    const data: AuthData = {
      uid,
      email,
      isAuthenticated: true,
    };
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de autenticação:', error);
  }
}

export async function getAuthData(): Promise<AuthData | null> {
  try {
    const data = await AsyncStorage.getItem(AUTH_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Erro ao buscar dados de autenticação:', error);
    return null;
  }
}

export async function removeAuthData() {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Erro ao remover dados de autenticação:', error);
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const data = await getAuthData();
  return data?.isAuthenticated ?? false;
}
