import React from "react";
import { View } from "react-native";

import SkillChart from "../../app/SkillChart/main";

export default () => (
  <View
    style={{
      marginHorizontal: 12,
      justifyContent: "center",
      alignItems: "center",
      flex: 1
    }}
  >
    <SkillChart />
  </View>
);
