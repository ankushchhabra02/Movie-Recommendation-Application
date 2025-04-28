import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import GenreSelectButton from "../components/GenreSelectButton";
import RoundedGreenButton from "../components/RoundedGreenButton";

const WatchPreferenceScreen = () => {
  const genres = [
    {
      id: 1,
      name: "🔫 Action",
      selected: false,
    },
    {
      id: 2,
      name: "🤣 Comedy",
      selected: false,
    },
    {
      id: 3,
      name: "😭 Drama",
      selected: false,
    },
    {
      id: 4,
      name: "👻 Horror",
    },
    {
      id: 5,
      name: "🎶 Musical",
    },
    {
      id: 6,
      name: "💕 Romance",
    },
  ];
  const navigation = useNavigation();
  return (
    <View className="bg-black flex-1">
      <Header screenName={"Preferences"} navigation={navigation} />

      <View className="p-4 flex-1">
        <View className="py-4">
          <Text className="text-white text-2xl font-bold">
            What do you want to see?
          </Text>
          <Text className="text-md text-gray-400">
            Select you favourite genres of movies, or genres you are intrested
            in watching. <Text className="text-green-500">Chhello</Text> will
            provide you recommendations based on preferences you have selected.
          </Text>
        </View>

        <View className="flex-row flex-wrap">
          {genres.map((genre) => {
            return (
              <GenreSelectButton
                key={genre.id}
                GenreName={genre.name}
                isSelected={genre.selected}
              />
            );
          })}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Streaming")}
          className="absolute bg-green-500 p-4 rounded-full items-center bottom-4 w-full self-center"
        >
          <Text className="text-xl font-bold text-white">SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WatchPreferenceScreen;
