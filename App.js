import { StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WatchlistScreen from "./screens/WatchlistScreen";
import AccountScreen from "./screens/AccountSettingScreen";
import WatchlistSettingScreen from "./screens/WatchlistSettingScreen";
import StreamingPreferencesScreen from "./screens/StreamingPreferenceScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WatchPreferenceScreen from "./screens/WatchPreferenceScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Screens */}
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Preferences" component={WatchPreferenceScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Streaming" component={StreamingPreferencesScreen} />
        <Stack.Screen
          name="WatchlistSetting"
          component={WatchlistSettingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
