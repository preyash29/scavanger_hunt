import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  setflatListWid: {
    width: "100%",
    flexDirection: "row",
    marginTop: "3%",
    borderBottomWidth: 0.3,
    paddingVertical: "3%",
  },
  flexJustify: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: Theme.align,
  },
  wrap50: {
    width: "50%",
  },
});

export default styles;
