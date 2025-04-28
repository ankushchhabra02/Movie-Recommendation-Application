import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import RoundedGreenButton from "../components/RoundedGreenButton";
import CounterButton from "../components/CounterButton";

const WatchlistSettingScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-black">
      <Header screenName={"Watchlist settings"} navigation={navigation} />

      <View className="p-4 space-y-4 flex-1">
        <View className="py-4">
          <Text className="text-white text-2xl font-bold">
            Ephemeral watchlist
          </Text>
          <Text className="text-md text-gray-400">
            Adjust the number of movie you want to store in watchlist, and for
            how many days. <Text className="text-green-500">Chhello</Text> will
            only keep around your selections for selected days, also it wont
            store more than the limit.
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-white text-sm flex-1">
            Set limit of movies in watchlist
          </Text>
          <CounterButton val={7} lowerLimit={1} upperLimit={7} />
        </View>
        <View className="flex-row items-center">
          <Text className="text-white text-sm flex-1">
            Ephemeral duration of watchlist (Days)
          </Text>
          <CounterButton val={3} lowerLimit={1} upperLimit={7} />
        </View>
      </View>

      <RoundedGreenButton
        text="SAVE"
        navigation={navigation}
        navigateTo={"Home"}
      />
    </View>
  );
};

export default WatchlistSettingScreen;
