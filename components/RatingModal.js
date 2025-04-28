import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";

const RatingModal = ({
  isVisible,
  movieName,
  setCurrentMovieRating,
  setCurrentMovieModalVisibility,
}) => {
  return (
    <Modal coverScreen={true} animationInTiming={100} isVisible={isVisible}>
      <View className="bg-black p-4 rounded-xl w-11/12 self-center">
        <Text className="text-white text-center text-xl">
          What did you think of{"\n"}
          <Text className="text-green-500 font-bold text-2xl">
            {movieName}?
          </Text>
        </Text>
        <Slider
          style={{
            marginTop: 20,
            marginBottom: 10,
            alignSelf: "center",
            width: "90%",
          }}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#16A34A"
          thumbTintColor="#16A34A"
          minimumValue={1}
          maximumValue={5}
          step={1}
          onSlidingComplete={(value) => {
            setCurrentMovieRating(value);
            setCurrentMovieModalVisibility(false);
          }}
        />
        <View className="flex-row">
          <Text className="flex-1 text-center text-3xl">🤬</Text>
          <Text className="flex-1 text-center text-3xl">🙁</Text>
          <Text className="flex-1 text-center text-3xl">😐</Text>
          <Text className="flex-1 text-center text-3xl">😃</Text>
          <Text className="flex-1 text-center text-3xl">🤯</Text>
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;
