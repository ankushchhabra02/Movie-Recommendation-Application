import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import RoundedGreenButton from "../components/RoundedGreenButton";
import axios from "axios";
import BASE_URL, { userId } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const updatePassword = async (password, newPassword) => {
  try {
    if (password && newPassword) {
      const userId = await AsyncStorage.getItem("userId");

      await axios.put(`${BASE_URL}/user/update/password`, {
        userId,
        data: {
          password,
          newPassword,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const ChangePasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const navigation = useNavigation();

  const handleSave = async () => {
    setLoading(true);
    await updatePassword(password, newPassword);
    setLoading(false);
  };
  return (
    <View className="flex-1 bg-black">
      <Header screenName={"Change Password"} navigation={navigation} />

      <View className="p-4 flex-1">
        <View className="space-y-4">
          <View className="py-4">
            <Text className="text-white text-2xl font-bold">
              Change Password
            </Text>
            <Text className="text-md text-gray-400">
              Choose a new password for your{" "}
              <Text className="text-green-500">Chhello</Text> account. Keep in
              mind to select a strong password, your password must contain both
              uppercase and smallercase letters, numbers, and special
              characters.
            </Text>
          </View>

          <View className="space-y-2">
            <Text className="text-white">Current Password</Text>
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={(val) => setPassword(val)}
              placeholder="Type your current password"
              placeholderTextColor={"#6B7280"}
              style={{ borderBottomWidth: 1 }}
              className="text-white text-sm bg-zinc-900 p-4 rounded-lg"
            />
          </View>

          <View className="space-y-2">
            <Text className="text-white">New Password</Text>
            <TextInput
              secureTextEntry
              value={newPassword}
              onChangeText={(val) => setNewPassword(val)}
              placeholder="Select a strong password"
              placeholderTextColor={"#6B7280"}
              style={{ borderBottomWidth: 1 }}
              className="text-white text-sm bg-zinc-900 p-4 rounded-lg"
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={loading}
          className="bg-green-500 p-4 rounded-lg items-center w-full self-center mt-4"
        >
          {loading === true ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text className="font-bold text-white">UPDATE</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
