import { StyleSheet } from "react-native";

import {
  alignItems,
  justifyContent,
  fontSize,
  primaryColor,
} from "../../../util/util";

const style = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems,
    justifyContent,
  },

  text: {
    fontSize: fontSize * 1.5,
    color: primaryColor,
  },
});

export default style;
