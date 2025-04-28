import { Text, TouchableOpacity } from "react-native";
import React from "react";

const RoundedGreenButton = ({ text, navigation, navigateTo }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate(navigateTo)}
      className="absolute bg-green-500 p-4 rounded-full items-center bottom-4 w-full self-center"
    >
      <Text className="text-xl font-bold text-white">{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundedGreenButton;
