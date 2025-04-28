import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
} from "react-native-heroicons/outline";
import WatchlistModal from "./WatchlistModal";
import { BASE_URL, userId } from "../config/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addBookmark = async (movieId) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    await axios.post(`${BASE_URL}/bookmark/new`, {
      userId: userId,
      movieId: movieId,
    });
    console.log(movieId + " added");
  } catch (error) {
    console.log(error);
  }
};

const removeBookmark = async (movieId) => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    await axios.delete(`${BASE_URL}/bookmark/delete`, {
      data: {
        userId: userId,
        movieId: movieId,
      },
    });
    console.log(movieId + " removed");
  } catch (error) {
    console.log(error);
  }
};

const Card = ({
  movieId,
  genre,
  cast,
  director,
  posterImg,
  name,
  description,
}) => {
  const [loading, setLoading] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [watchlistModalVisibility, setWatchlistModalVisibility] =
    useState(false);
  const [descriptionCollapsed, setDescriptionCollapsed] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    if (!bookmark) {
      await addBookmark(movieId);
    } else {
      await removeBookmark(movieId);
    }
    setLoading(false);
    setWatchlistModalVisibility(true);
    setTimeout(() => setWatchlistModalVisibility(false), 1000);
    setBookmark(!bookmark);
  };

  const toggleDescription = () => {
    setDescriptionCollapsed(!descriptionCollapsed);
  };
  return (
    <View className="bg-white h-full relative -mt-12  rounded-xl overflow-hidden">
      <Image
        source={{
          uri: posterImg,
        }}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      />
      <TouchableOpacity
        onLongPress={handleSave}
        className="absolute right-0 top-0 m-3 p-3 bg-black rounded-full"
      >
        {bookmark === true ? (
          <BookmarkSlashIcon size={35} color="#4CAF50" />
        ) : (
          <BookmarkIcon size={35} color="#4CAF50" />
        )}
      </TouchableOpacity>
      {descriptionCollapsed === true ? (
        <View className="absolute h-3/4 bottom-0 left-0 w-full">
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="absolute bottom-0 w-screen h-full"
          />
          <View className="absolute bottom-0 left-0 p-4">
            <Text className="text-green-500 text-3xl font-bold">{name}</Text>
            <TouchableOpacity onPress={() => toggleDescription()}>
              <Text className="text-white">{description}</Text>
              <View className="flex-row items-center flex-wrap">
                <Text className="text-white border-2 border-white p-2 mt-4 mr-4 rounded-2xl">
                  {genre.map((g, index) =>
                    index !== genre.length - 1 ? g + ", " : g
                  )}
                </Text>
                <Text className="text-white border-2 border-white p-2 mt-4 mr-4 rounded-2xl">
                  {director}
                </Text>
                <Text className="text-white border-2 border-white p-2 mt-4 mr-4 rounded-2xl">
                  {cast.map((c, index) =>
                    index !== cast.length - 1 ? c + ", " : c
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="absolute h-1/3 bottom-0 left-0 w-full">
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="absolute bottom-0 w-screen h-full"
          />
          <View className="absolute bottom-0 left-0 p-4">
            <Text className="text-green-500 text-3xl font-bold">{name}</Text>
            <TouchableOpacity onPress={() => toggleDescription()}>
              <Text className="text-white" numberOfLines={3}>
                {description}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Watchlist Modal */}
      <WatchlistModal
        isVisible={watchlistModalVisibility}
        bookmark={bookmark}
      />
    </View>
  );
};

export default Card;
