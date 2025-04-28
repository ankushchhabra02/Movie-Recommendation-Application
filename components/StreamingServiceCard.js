import { TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { CheckCircleIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "react-native-heroicons/solid";

const StreamingServiceCard = ({ imageUrl, isSelected }) => {
  const [selected, setSelected] = useState(isSelected);

  const selectService = () => setSelected(!selected);

  return selected === true ? (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => selectService()}
      className="border-green-500 rounded-md overflow-hidden h-36 relative border-2 mb-4"
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        className="h-full w-full"
      />

      <CheckCircleIconSolid
        style={{ position: "absolute", right: 4, top: 4 }}
        size={30}
        color="#4CAF50"
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => selectService()}
      className="border-white rounded-md overflow-hidden h-36 relative border-2 mb-4"
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        className="h-full w-full"
      />

      <CheckCircleIcon
        style={{ position: "absolute", right: 4, top: 4 }}
        size={30}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default StreamingServiceCard;
