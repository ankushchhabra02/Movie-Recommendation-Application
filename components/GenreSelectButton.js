import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const GenreSelectButton = ({ GenreName, isSelected }) => {
  const [selected, setSelected] = useState(isSelected);
  const selectGenre = () => setSelected(!selected);

  return selected === true ? (
    <TouchableOpacity activeOpacity={1} onPress={() => selectGenre()}>
      <View className="border-2 border-green-500 bg-green-500 p-4 rounded-full mt-2 mr-2">
        <Text className="text-white text-sm">{GenreName}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={1} onPress={() => selectGenre()}>
      <View className="border-2 border-green-500 p-4 rounded-full mt-2 mr-2">
        <Text className="text-white text-sm">{GenreName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GenreSelectButton;
