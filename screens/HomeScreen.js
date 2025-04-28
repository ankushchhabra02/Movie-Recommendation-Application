import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BookmarkIcon } from "react-native-heroicons/solid";
import RenderStack from "../components/RenderStack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerModal from "../components/DrawerModal";
import axios from "axios";
import { BASE_URL, userId } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState(null);

  const navigation = useNavigation();
  const [drawerModalVisibility, setDrawerModalVisibility] = useState(false);
  const toggleDrawerVisibility = () => {
    setDrawerModalVisibility(!drawerModalVisibility);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const firstname = await AsyncStorage.getItem("firstname");
        const response = await axios.post(`${BASE_URL}/movie/fetch`, {
          userId,
        });
        setData(response.data.data);
        setFirstName(firstname);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View>
        {/* Header */}
        <View className="flex-row items-center p-4 space-x-2">
          <TouchableOpacity onPress={() => toggleDrawerVisibility()}>
            <Image
              source={{
                uri: "https://picsum.photos/200/300",
              }}
              className="rounded-full h-10 w-10"
            />
            <DrawerModal
              isVisible={drawerModalVisibility}
              toggle={toggleDrawerVisibility}
              userProfileImg="https://picsum.photos/200/300"
              navigation={navigation}
            />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-lg font-bold text-white">
              {firstName ? `Hello, ${firstName}👋` : `...`}
            </Text>
            <Text className="text-xs text-gray-400">
              Let's find something for you to watch
            </Text>
          </View>
          <TouchableOpacity
            className="bg-green-500 p-2 rounded-full"
            onPress={() => navigation.navigate("Watchlist")}
          >
            <BookmarkIcon size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        {data.length > 0 ? (
          <RenderStack data={data} />
        ) : (
          <View>
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
