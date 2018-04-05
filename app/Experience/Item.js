import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { remToPixel } from "../utils/Convertor";
import { TitleColors } from "../utils/ProjectColors";

export default class Item extends PureComponent {
  render() {
    const { year, info } = this.props;
    return (
      <View style={Styles.item}>
        <Text
          style={{
            fontSize: remToPixel(10),
            fontWeight: "400",
            color: TitleColors.H2TitleColor
          }}
        >
          {year}
        </Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start"
          }}
        >
          {info.map((value, index) => (
            <Text
              key={`experience-${index + 1}`}
              style={{
                color: "#888888",
                lineHeight: remToPixel(1.5),
                fontWeight: "300",
                marginLeft: 14
              }}
            >
              {value}
            </Text>
          ))}
        </View>
      </View>
    );
  }
}

Item.propTypes = {
  year: PropTypes.string,
  info: PropTypes.arrayOf(PropTypes.string)
};

Item.defaultProps = {
  year: "",
  info: []
};

const Styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15
  }
});
