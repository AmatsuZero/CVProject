import { Dimensions } from "react-native";

const remToPixel = (rem, defaultFontSize = 14) => rem * defaultFontSize;

const equalSize = (spacing, fold) =>
  (Dimensions.get("window").width - spacing * (fold + 1)) / fold;

export { remToPixel, equalSize };
