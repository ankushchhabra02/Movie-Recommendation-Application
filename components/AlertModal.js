import { View, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";

const AlertModal = ({ mode, message, isVisible }) => {
  return (
    <Modal
      isVisible={isVisible}
      hasBackdrop={false}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View className="flex-1 relative">
        <View
          style={{ marginLeft: -18, marginTop: -18, height: 76 }}
          className="absolute top-0 left-0 bg-green-500 w-screen justify-center items-center"
        >
          <Text className="font-bold text-xl text-white text-center">
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
