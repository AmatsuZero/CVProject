import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity,
  UIManager,
  findNodeHandle
} from "react-native";
import Icon from "react-native-vector-icons/Foundation";
import { remToPixel } from "../utils/Convertor";
import Table from "./Table";
import { TitleColors } from "../utils/ProjectColors";
import { CommitImageView, CommitSceneView, Presenter } from "./CommitImageView";

export default class Github extends PureComponent {
  arRef = null;
  constructor() {
    super();
    this.state = {
      isSceneView: false
    };
    this.arHandle = findNodeHandle(this.arRef);
  }

  render() {
    return (
      <View style={Styles.main}>
        <Text style={Styles.title}>Github:</Text>
        {Platform.OS === "ios" ? (
          <View>
            {this.state.isSceneView ? (
              <CommitSceneView style={Styles.heatMap3D} />
            ) : (
              <CommitImageView style={Styles.heatMap} />
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10
              }}
            >
              <Icon.Button
                name="crop"
                backgroundColor="#3b5998"
                onPress={() =>
                  this.setState({ isSceneView: !this.state.isSceneView })
                }
              >
                {this.state.isSceneView ? "普通" : "3D"}
              </Icon.Button>
              <View>
                <Presenter ref={ref => (this.arRef = ref)} />
                <Icon.Button
                  name="camera"
                  backgroundColor="#3b5998"
                  onPress={() => this.arRef.presentAR()}
                >
                  VR查看
                </Icon.Button>
              </View>
            </View>
          </View>
        ) : (
          <WebView
            style={Styles.heatMap}
            scalesPageToFit
            automaticallyAdjustContentInsets
            source={{ uri: "http://ghchart.rshah.org/AmatsuZero" }}
          />
        )}
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
    height: 106
  },
  heatMap3D: {
    flex: 1,
    height: 260,
    alignSelf: "auto"
  },
  dividingLine: {
    height: 1,
    flex: 1,
    backgroundColor: TitleColors.H3TitleColor
  }
});
