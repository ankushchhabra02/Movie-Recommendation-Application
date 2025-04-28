import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import {
  UserIcon,
  FilmIcon,
  BookmarkIcon,
  ArrowLeftOnRectangleIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/routers";

const DrawerModal = ({ isVisible, toggle, userProfileImg, navigation }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const firstname = await AsyncStorage.getItem("firstname");
        const lastname = await AsyncStorage.getItem("lastname");
        const email = await AsyncStorage.getItem("email");

        setFirstName(firstname);
        setLastName(lastname);
        setEmail(email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSignout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("firstname");
      await AsyncStorage.removeItem("lastname");
      await AsyncStorage.removeItem("email");

      setLoading(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Landing" }], // Reset to landing screen
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggle}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <View style={{ marginLeft: -18 }} className="bg-black w-5/6 h-screen">
        <View style={{ borderBottomWidth: 1 }} className="p-4 border-gray-800">
          <Image
            source={{
              uri: userProfileImg,
            }}
            className="rounded-full h-12 w-12"
          />
          <View className="py-4">
            <Text className="text-white font-bold text-xl">
              {firstName} {lastName}
            </Text>
            <Text className="text-xs text-gray-400">{email}</Text>
          </View>
        </View>
        <View className="p-4 flex-1">
          <TouchableOpacity
            className="flex-row items-center space-x-4 my-4"
            onPress={() => {
              toggle();
              navigation.navigate("Account");
            }}
          >
            <UserIcon size={30} color="#4CAF50" />
            <Text className="text-white text-xl">Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center space-x-4 my-4"
            onPress={() => {
              toggle();
              navigation.navigate("Preferences");
            }}
          >
            <PencilSquareIcon size={30} color="#4CAF50" />
            <Text className="text-white text-xl">Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center space-x-4 my-4"
            onPress={() => {
              toggle();
              navigation.navigate("Streaming");
            }}
          >
            <FilmIcon size={30} color="#4CAF50" />
            <Text className="text-white text-xl">Streaming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center space-x-4 my-4"
            onPress={() => {
              toggle();
              navigation.navigate("WatchlistSetting");
            }}
          >
            <BookmarkIcon size={30} color="#4CAF50" />
            <Text className="text-white text-xl">Watchlist</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleSignout()}
          className="mx-4 my-8 bg-red-500 p-4 rounded-full items-center"
        >
          <Text className="text-xl font-bold text-white">LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default DrawerModal;
