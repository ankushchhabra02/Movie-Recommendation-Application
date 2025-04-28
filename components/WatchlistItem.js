import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import WatchlistMovieModal from "./WatchlistMovieModal";

const WatchlistItem = ({
  posterImgUrl,
  movieId,
  title,
  genre,
  cast,
  director,
  description,
  link,
}) => {
  const [expanded, setExpanded] = useState(false);
  const expand = () => setExpanded(!expanded);
  return (
    <View>
      <TouchableOpacity
        onPress={() => expand()}
        className="flex-row p-4 space-x-2 items-center"
      >
        <Image
          source={{
            uri: posterImgUrl,
          }}
          className="h-28 w-20"
        />
        <View className="flex-auto">
          <Text className="text-white text-lg">{title}</Text>
          <Text numberOfLines={3} className="text-gray-400 text-sm">
            {description}
          </Text>
          <Text className="text-gray-600 text-xs">
            {genre.map((g, index) =>
              index !== genre.length - 1 ? g + ", " : g
            )}
          </Text>
          <Text numberOfLines={1} className="text-gray-600 text-xs">
            {cast.map((c, index) => (index !== cast.length - 1 ? c + ", " : c))}
          </Text>
        </View>
      </TouchableOpacity>

      <WatchlistMovieModal
        isVisible={expanded}
        movieId={movieId}
        genre={genre}
        cast={cast}
        director={director}
        setExpanded={setExpanded}
        posterImageUrl={posterImgUrl}
        title={title}
        description={description}
        link={link}
      />
    </View>
  );
};

export default WatchlistItem;
