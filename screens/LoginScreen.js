import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import axios from "axios";
import { BASE_URL } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertModal from "../components/AlertModal";

const LoginScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [loading, setLoading] = useState(false);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMode, setAlertMode] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const showAlert = (mode, message) => {
    setAlertVisibility(true);
    setAlertMessage(mode);
    setAlertMessage(message);
    setTimeout(() => setAlertVisibility(false), 1000);
  };

  const handleLogin = () => {
    setLoading(true);
    if (!isValidEmail(email)) {
      showAlert("message", "Please enter a valid email");
      setLoading(false);
      return;
    }
    axios
      .post(`${BASE_URL}/user`, {
        email,
        password,
      })
      .then(async (res) => {
        if (res.status === 200) {
          const { userId, firstname, lastname, email } = res.data;

          // Store data in AsyncStorage
          await AsyncStorage.setItem("userId", userId);
          await AsyncStorage.setItem("firstname", firstname);
          await AsyncStorage.setItem("lastname", lastname);
          await AsyncStorage.setItem("email", email);

          setLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Home" }], // Reset to home screen
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          showAlert("message", error.response.data.message);
        } else {
          showAlert("message", "An error occurred. Please try again.");
        }
        setLoading(false);
      });
  };

  const isValidEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-black">
      <Header screenName={"Log in"} navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-8 space-y-4"
      >
        <View className="space-y-2">
          <Text className="text-white">Email</Text>
          <TextInput
            value={email}
            onChangeText={(val) => setEmail(val)}
            placeholder="johndoe@mail.com"
            placeholderTextColor={"#6B7280"}
            className="text-white text-sm bg-zinc-900 p-4 rounded-lg"
          />
        </View>

        <View className="space-y-2">
          <Text className="text-white">Password</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={(val) => setPassword(val)}
            placeholder="Pick a strong password"
            placeholderTextColor={"#6B7280"}
            className="text-white text-sm bg-zinc-900 p-4 rounded-lg"
          />
        </View>

        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            handleLogin();
          }}
        >
          <View className="bg-green-500 items-center p-4 rounded-lg">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white">Log in</Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="self-center"
          onPress={() => navigation.replace("Signup")}
        >
          <Text className="text-white">
            Dont have an account? <Text className="text-green-500">Signup</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <AlertModal
        mode={alertMode}
        message={alertMessage}
        isVisible={alertVisibility}
      />
    </View>
  );
};

export default LoginScreen;
