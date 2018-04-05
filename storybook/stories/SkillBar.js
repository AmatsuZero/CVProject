import React from "react";
import { View } from "react-native";
import Chart from "../../app/SkillPoint/main";

export default () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "stretch",
      flex: 1,
      marginHorizontal: 10
    }}
  >
    <Chart />
  </View>
);
