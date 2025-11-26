import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { isAuthenticated } from "../services/auth";

export default function Index() {
  const [isChecking, setIsChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authenticated = await isAuthenticated();
    setIsLoggedIn(authenticated);
    setIsChecking(false);
  };

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f3e7" }}>
        <ActivityIndicator size="large" color="#6b5a4a" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? "/Home" : "/Auth"} />;
}
