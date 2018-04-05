import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native";
import Item from "./Item";

export default class MyProjects extends PureComponent {
  render() {
    return (
      <View style={Styles.main}>
        <Item
          title="OpenCLSwift"
          link="https://github.com/AmatsuZero/CLSwift.git"
          description="这是一个OpenCL API的Swift Wrapper。\n可用来做图像处理，大数据处理，\nOpenGL加速等等。目前尚未完成……"
        />
        <Item
          title="react-native-zip-archive"
          link="https://github.com/mockingbot/react-native-zip-archive"
          description="RN版的Zip解压/压缩工具。\n参与了iOS部分API的改进。"
        />
        <Item
          title="electron-color-picker"
          link="https://github.com/mockingbot/electron-color-picker"
          description="负责Mac版原生取色器部分。"
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 40
  }
});
