import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { TitleColors } from "../utils/ProjectColors";
import { remToPixel } from "../utils/Convertor";

export default class Skill extends PureComponent {
  drawPoint(size) {
    const array = new Array(8).fill(0);
    return (
      <View style={Styles.container}>
        {array.map((val, index) => (
          <View
            key={`SkillPoint-${index + 1}`}
            style={{
              height: remToPixel(1.2),
              width: remToPixel(1.2),
              borderRadius: remToPixel(1.2) / 2,
              backgroundColor:
                index < size - 1
                  ? TitleColors.H2TitleColor
                  : TitleColors.H3TitleColor,
              marginHorizontal: remToPixel(0.2)
            }}
          />
        ))}
      </View>
    );
  }

  render() {
    const { name, number } = this.props;
    return (
      <View style={Styles.main}>
        <Text style={Styles.title}>{name}</Text>
        {this.drawPoint(number)}
      </View>
    );
  }
}

Skill.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number
};

Skill.defaultProps = {
  name: "",
  number: 0
};

const Styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },
  title: {
    color: TitleColors.H2TitleColor
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
