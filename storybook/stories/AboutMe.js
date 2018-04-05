import React from "react";
import { View } from "react-native";
import BasicInfo from "../../app/BasicInformation/Main";

export default () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    }}
  >
    <BasicInfo />
  </View>
);
