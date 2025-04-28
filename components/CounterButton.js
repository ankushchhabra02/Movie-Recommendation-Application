import { View, Text, TouchableHighlight } from "react-native";
import React, { useState } from "react";

const CounterButton = ({ val, upperLimit, lowerLimit }) => {
  const [value, setValue] = useState(val);
  return (
    <View className="flex-row items-center space-x-2">
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#86EFAC"
        onPress={() => setValue(value > lowerLimit ? value - 1 : value)}
        className="border-2 border-green-500 h-8 w-8 items-center rounded-md"
      >
        <Text className="text-green-500 text-lg font-bold">-</Text>
      </TouchableHighlight>
      <Text className="text-white font-bold">{value}</Text>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#86EFAC"
        onPress={() => setValue(value < upperLimit ? value + 1 : value)}
        className="border-2 border-green-500 h-8 w-8 items-center rounded-md"
      >
        <Text className="text-green-500 text-lg font-bold">+</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CounterButton;
