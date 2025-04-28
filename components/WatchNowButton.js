import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as Linking from "expo-linking";

const WatchNowButton = ({ gotoLink, setExpanded }) => {
  const [redirectValue, setRedirectValue] = useState("");
  const [tapped, setTapped] = useState(false);
  const tap = () => {
    setTapped(!tapped);
  };
  return tapped === true ? (
    <TouchableOpacity className="bg-green-800 p-4 rounded-full items-center mt-4 w-full self-center">
      <Text className="text-xl font-bold text-white">
        Redirecting you to {redirectValue}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={async () => {
        const supported = await Linking.canOpenURL(gotoLink);

        if (supported) {
          var redirect = gotoLink.split(".")[1];
          redirect = redirect.charAt(0).toUpperCase() + redirect.slice(1);
          setRedirectValue(redirect);
          setTapped(true);
          setTimeout(async () => {
            await Linking.openURL(gotoLink);
            setTapped(false);
            setExpanded(false);
          }, 1000);
        } else {
          console.log(`Don't know how to open URI: ${gotoLink}`);
        }
      }}
      className="bg-green-500 p-4 rounded-full items-center mt-4 w-full self-center"
    >
      <Text className="text-xl font-bold text-white">Watch Now</Text>
    </TouchableOpacity>
  );
};

export default WatchNowButton;
