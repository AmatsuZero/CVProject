import React from "react";
import { View } from "react-native";

import BasicInfo from "../../app/BriefIntroductionTable";

export default () => (
  <View
    style={{
      flex: 1,
      marginHorizontal: 12,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <BasicInfo />
  </View>
);
