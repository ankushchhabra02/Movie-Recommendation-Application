import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { CheckCircleIcon } from "react-native-heroicons/outline";

const RedirectModal = ({ redirectTo, isVisible }) => {
  return (
    <Modal coverScreen={true} isVisible={isVisible} backdropOpacity={0.9}>
      <View className="rounded-xl p-2 flex-row items-center justify-center space-x-2 bg-green-500">
        <CheckCircleIcon size={30} color="white" />
        <Text className="text-white">Redirecting you to {redirectTo}</Text>
      </View>
    </Modal>
  );
};

export default RedirectModal;
