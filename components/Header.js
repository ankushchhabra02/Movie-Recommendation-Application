import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

const Header = ({ screenName, navigation }) => {
  return (
    <View className="flex-row items-center p-4 space-x-2 bg-black">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={30} color="white" />
      </TouchableOpacity>
      <Text className="text-3xl font-bold text-white">{screenName}</Text>
    </View>
  );
};

export default Header;
