import { Platform } from "react-native";
import colors from "./colors";

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: Platform.OS === "android" ? 0.5 : 0.2,
    shadowOffset: {
      width: Platform.OS === "android" ? 0.5 : 1,
      height: 1,
    },
    elevation: Platform.OS === "android" ? 4 : 1,
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};
