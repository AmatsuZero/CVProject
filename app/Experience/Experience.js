import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import Item from "./Item";

export default class Experience extends PureComponent {
  render() {
    return (
      <View style={Styles.container}>
        <Item
          year="3"
          info={[
            "三年原生开发经验",
            "了解桌面/移动开发原理",
            "热衷iOS/Mac开发"
          ]}
        />
        <Item
          year="2"
          info={[
            "两年JS开发经验",
            "熟悉RN/Electron/插件开发",
            "熟悉各类开发工具调试的使用"
          ]}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15
  }
});
