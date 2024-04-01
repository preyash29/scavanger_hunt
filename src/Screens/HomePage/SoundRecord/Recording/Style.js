import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    // backgroundColor: Theme.white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "30%",
  },
  btnWrap: {
    backgroundColor: Theme.primary,
    width: Theme.wp("30%"),
    height: Theme.hp("8%"),
    marginTop: "5%",
    alignItems: Theme.align,
    justifyContent: Theme.align,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  txtBtn: {
    color: Theme.white,
    fontWeight: Theme.bold,
    fontSize: Theme.txtMedium,
  },
  ff: {
    fontSize: Theme.txtMedium,
  },
  flexAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
