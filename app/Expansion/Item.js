import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Foundation";
import { remToPixel } from "../utils/Convertor";
import { TitleColors } from "../utils/ProjectColors";

export default class Item extends PureComponent {
  render() {
    const { icon, name } = this.props;
    return (
      <View style={Styles.main}>
        <View style={Styles.content}>
          <Icon
            name={icon}
            size={remToPixel(4)}
            color={TitleColors.H2TitleColor}
          />
          <Text
            style={{
              color: TitleColors.H2TitleColor,
              lineHeight: remToPixel(1.5)
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    );
  }
}

Item.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string
};

Item.defaultProps = {
  icon: "",
  name: ""
};

const Styles = StyleSheet.create({
  main: {
    width: remToPixel(8),
    height: remToPixel(8),
    borderRadius: remToPixel(4),
    borderColor: "#c1c2c4",
    borderWidth: 1,
    margin: 20
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: remToPixel(8),
    height: remToPixel(8)
  }
});
