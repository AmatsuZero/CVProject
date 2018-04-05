import React, { PureComponent } from "react";
import { Platform, StyleSheet, Text, View, WebView } from "react-native";
import { remToPixel } from "../utils/Convertor";
import Table from "./Table";
import { TitleColors } from "../utils/ProjectColors";

export default class Github extends PureComponent {
  constructor() {
    super();
    this.webView = null;
  }

  setWebViewRef(ref) {
    this.webView = ref;
  }

  render() {
    return (
      <View style={Styles.main}>
        <Text style={Styles.title}>Github:</Text>
        <WebView
          ref={ref => this.setWebViewRef(ref)}
          style={Styles.heatMap}
          scalesPageToFit
          automaticallyAdjustContentInsets
          source={{ uri: "http://ghchart.rshah.org/AmatsuZero" }}
          onLoad={() => {
            const script = "document.body.style.zoom = 1.5;";
            if (Platform.OS === "ios" && this.webView) {
              this.webView.injectJavaScript(script);
            }
          }}
        />
        <View style={Styles.dividingLine} />
        <Table />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    marginTop: 10,
    justifyContent: "space-between"
  },
  title: {
    marginVertical: 5,
    lineHeight: remToPixel(1.6),
    fontSize: 15,
    fontWeight: "300"
  },
  heatMap: {
    flex: 1,
    height: 100,
    alignSelf: "stretch"
  },
  dividingLine: {
    height: 1,
    flex: 1,
    backgroundColor: TitleColors.H3TitleColor
  }
});
