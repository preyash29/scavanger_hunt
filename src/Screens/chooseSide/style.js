import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  setWidth: {
    width: Theme.width,
    paddingVertical: Theme.hp("4%"),
    alignSelf: Theme.align,
    alignItems: Theme.align,
  },
  txtPass: {
    fontSize: Theme.txtLarge,
    color: Theme.txtBlack,
    textAlign: Theme.align,
    paddingVertical: "3%",
  },
  txtEnter: {
    fontSize: Theme.txtMedium,
    color: Theme.txtBlack,
    textAlign: Theme.align,
  },
  wrapBtn: {
    backgroundColor: "#D8EEFD",
    width: Theme.wp("95%"),
    height: Theme.hp("24%"),
    borderRadius: 10,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    marginTop: Theme.hp("3%"),
    ...Theme.shadow,
  },
  txtPhone: {
    color: "#565656",
    fontWeight: Theme.bold,
    fontSize: Theme.RFPercentage(2.2),
    marginTop: Theme.hp("1%"),
  },
  txtTitle: {
    color: "#565656",
    fontWeight: Theme.bold,
    fontSize: Theme.RFPercentage(3),
    marginTop: Theme.hp("3%"),
    textAlign: "center",
    marginHorizontal: Theme.wp("16%"),
  },
  chooseSideOptions: {
    alignItems: "center",
  },
  wrapInside: {
    width: Theme.wp("16%"),
    height: Theme.wp("16%"),
    borderRadius: Theme.wp("8%"),
    backgroundColor: Theme.primary,
    alignItems: "center",
    justifyContent: "center",
    ...Theme.shadow,
  },
});

export default styles;
