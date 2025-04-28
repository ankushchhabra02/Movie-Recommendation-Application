import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import StreamingServiceCard from "../components/StreamingServiceCard";
import RoundedGreenButton from "../components/RoundedGreenButton";

const PreferencesScreen = () => {
  const services = [
    {
      id: 1,
      name: "netflix",
      imageUrl:
        "https://variety.com/wp-content/uploads/2020/05/netflix-logo.png",
      selected: false,
    },
    {
      id: 2,
      name: "primevideo",
      imageUrl:
        "https://m.media-amazon.com/images/G/01/primevideo/seo/primevideo-seo-logo.png",
      selected: false,
    },
    {
      id: 3,
      name: "hotstar",
      imageUrl:
        "https://secure-media.hotstar.com/web-assets/prod/images/Disney+Hotstar.jpg",
      selected: false,
    },
    {
      id: 4,
      name: "sonyliv",
      imageUrl: "https://etimg.etb2bimg.com/photo/76029910.cms",
      selected: false,
    },
  ];

  const navigation = useNavigation();
  return (
    <View className="bg-black flex-1">
      <Header
        screenName={"Streaming"}
        className="flex-1"
        navigation={navigation}
      />

      <View className="p-4 space-y-1 flex-1 relative">
        <ScrollView>
          <View className="py-4">
            <Text className="text-white text-2xl font-bold">
              What streaming services do you prefer?
            </Text>
            <Text className="text-md text-gray-400">
              Select you favourite streaming services, or streaming services you
              have subscription to.{" "}
              <Text className="text-green-500">Chhello</Text> will provide
              preference to streaming services you would chose.
            </Text>
          </View>

          {services.map((service) => {
            return (
              <StreamingServiceCard
                key={service.id}
                imageUrl={service.imageUrl}
                isSelected={service.selected}
              />
            );
          })}
          <View className="h-16"></View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.replace("Home")}
          className="absolute bg-green-500 p-4 rounded-full items-center bottom-4 w-full self-center"
        >
          <Text className="text-xl font-bold text-white">SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreferencesScreen;
