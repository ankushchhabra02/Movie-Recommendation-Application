import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const images = [
    "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BYzg4ZGU4ZTItNDI0ZC00MDdkLTk0ZDUtZjhjYWQ5OWFlNTg1XkEyXkFqcGdeQXVyMTU2NDkwOTAw._V1_FMjpg_UX1000_.jpg",
    "https://englishtribuneimages.blob.core.windows.net/gallary-content/2022/9/2022_9$largeimg_160792675.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTc5NjY4MjUwNF5BMl5BanBnXkFtZTgwODM3NzM5MzE@._V1_.jpg",
    "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91ZWAeRiIVS._SL1500_.jpg",
  ];
  return (
    <View className="flex-1 relative">
      <Carousel
        loop
        width={width}
        height={height}
        autoPlay={true}
        pai
        data={images}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <View className="flex-1 relative">
            <Image
              source={{
                uri: item,
              }}
              className="flex-1"
            />
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 1)"]}
              start={{ x: 0, y: 0.1 }}
              end={{ x: 0, y: 0.9 }}
              className="absolute w-screen h-full"
            />
          </View>
        )}
      />
      <View className="absolute top-0 w-full items-center h-1/6">
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 1)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="absolute w-screen h-full"
        />
        <Text className="text-green-500 text-3xl">Chello</Text>
      </View>
      <View className="absolute bottom-0 self-center m-4 space-y-2 w-full">
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <View className="bg-green-500 rounded-lg p-3 self-center w-1/2">
            <Text className="self-center text-white">Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;
