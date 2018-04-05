import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Foundation";
import PropTypes from "prop-types";
import { TitleColors } from "./utils/ProjectColors";
import { remToPixel } from "./utils/Convertor";

export default class DividingLine extends PureComponent {
  render() {
    const { name, title } = this.props;
    return (
      <View style={Styles.main}>
        <View style={Styles.header}>
          <Icon
            name={name}
            size={remToPixel(1.125)}
            color={TitleColors.VerticalSeparatorColor}
          />
          <Text style={Styles.title}>{title}</Text>
        </View>
        <View style={Styles.dashedBorder} />
      </View>
    );
  }
}

DividingLine.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string
};

DividingLine.defaultProps = {
  name: "",
  title: ""
};

const Styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    marginTop: remToPixel(3 * 1.25)
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10
  },
  title: {
    color: TitleColors.VerticalSeparatorColor,
    fontSize: remToPixel(1.125),
    paddingLeft: 4,
    fontWeight: "400"
  },
  dashedBorder: {
    height: 0,
    borderStyle: "dotted",
    borderWidth: 1,
    alignSelf: "stretch"
  }
});
