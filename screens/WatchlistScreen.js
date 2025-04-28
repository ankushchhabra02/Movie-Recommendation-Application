import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import WatchlistItem from "../components/WatchlistItem";
import Header from "../components/Header";
import { ScrollView } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchlistScreen = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const response = await axios.post(`${BASE_URL}/bookmark/fetch`, {
          userId: userId,
        });
        setMovies(response.data);
        console.log(response.data); // Update to log the response data instead of movies
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <Header screenName="Watchlist" navigation={navigation} />

      {/* Body */}
      <View className="flex-1">
        <ScrollView>
          {movies !== [] ? (
            movies.map((movie) => {
              return (
                <WatchlistItem
                  key={movie._id}
                  posterImgUrl={movie.posterImg}
                  movieId={movie._id}
                  title={movie.name}
                  cast={movie.cast}
                  director={movie.director}
                  genre={movie.genre}
                  description={movie.description}
                  link={movie.link}
                />
              );
            })
          ) : (
            <View className="p-4 space-y-4 flex-1">
              <View className="py-4">
                <Text className="text-white text-2xl font-bold">
                  Nothing to see here.
                </Text>
                <Text className="text-md text-gray-400">
                  All your bookmarked movies will appear here. Long Press on the
                  bookmark icon on the homepage to add that movie to your
                  watchlist.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default WatchlistScreen;
