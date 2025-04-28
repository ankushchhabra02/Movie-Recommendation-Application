import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { XMarkIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native";
import WatchNowButton from "./WatchNowButton";

const WatchlistMovieModal = ({
  isVisible,
  setExpanded,
  posterImageUrl,
  movieId,
  title,
  genre,
  cast,
  director,
  description,
  link,
}) => {
  const [loading, setLoading] = useState(false);
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

  const handleSave = async () => {
    setLoading(true);
    await removeBookmark(movieId);
    setLoading(false);
    setExpanded(false);
  };

  return (
    <Modal onBackButtonPress={() => setExpanded(false)} isVisible={isVisible}>
      <View
        style={{ marginLeft: -18 }}
        className="bg-black h-screen w-screen p-4"
      >
        <View className="items-end">
          <TouchableOpacity onPress={() => setExpanded(false)}>
            <XMarkIcon size={30} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
          <Image
            source={{
              uri: posterImageUrl,
            }}
            className="h-72 w-48 self-center mt-4"
          />
          <Text className="text-green-500 text-3xl font-bold self-center">
            {title}
          </Text>
          <Text className="text-gray-500 text-lg self-center">
            {genre.map((g, index) =>
              index !== genre.length - 1 ? g + ", " : g
            )}
          </Text>
          <Text className="text-white">{description}</Text>
          <Text className="text-white">
            <Text className="font-bold">Director:</Text> {director}
          </Text>
          <Text className="text-white">
            <Text className="font-bold">Stars:</Text>{" "}
            {cast.map((c, index) => (index !== cast.length - 1 ? c + ", " : c))}
          </Text>
          <Text className="text-gray-500 italic">
            <Text className="font-bold italic">Added:</Text> 2 days ago
          </Text>

          <WatchNowButton gotoLink={link[0]} setExpanded={setExpanded} />

          <TouchableOpacity
            onPress={handleSave}
            className="bg-green-500 p-4 rounded-full items-center w-full self-center"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-xl font-bold text-white">
                Remove from watchlist
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default WatchlistMovieModal;
