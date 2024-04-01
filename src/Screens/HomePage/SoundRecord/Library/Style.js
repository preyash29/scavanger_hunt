import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: "#303030",
  },
  txtTitle: {
    fontSize: Theme.txtMedium1,
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
    textAlign: Theme.align,
    margin: "5%",
  },
  txtNoData: {
    color: "#fff",
    fontWeight: "100",
    textAlign: Theme.align,
    paddingVertical: "60%",
    fontSize: 30,
  },
  wrapContent: {
    width: "100%",
  },
  txtName: {
    color: Theme.white,
    fontSize: Theme.txtMedium,
  },
  flexJustify: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    borderBottomColor: Theme.white,
    paddingVertical: "2%",
    alignItems: Theme.align,
  },
  imgPauseBtn: {
    width: Theme.wp("8%"),
    height: Theme.wp("8%"),
  },
  dd: {},
});

export default styles;
