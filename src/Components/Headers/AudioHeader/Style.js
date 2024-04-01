import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  txtLabel: {
    fontSize: Theme.txtMedium1,
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
    textAlign: Theme.align,
    alignSelf: "center",
  },
  headerWrap: {
    backgroundColor: "#303030",
    padding: "4%",
  },
  txtTitle: {
    fontSize: Theme.txtLarge,
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
    textAlign: Theme.align,
    margin: "5%",
  },
  flexAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Theme.primary,
    padding: "5%",
  },
  flexJustify: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default styles;
