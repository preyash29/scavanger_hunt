import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  imgSplash: {
    width: Theme.wp("30%"),
    height: Theme.wp("30%"),
    alignSelf: Theme.align,
    marginTop: "17%",
  },
  wrapEmailPass: {
    width: Theme.wp("90%"),
    alignSelf: Theme.align,
  },
  txtInput: {
    marginTop: Theme.hp("1.5%"),
  },
  btnLogin: {
    backgroundColor: Theme.primary,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    marginTop: Theme.hp("4%"),
    height: Theme.hp("8%"),
    borderRadius: 5,
  },
  txtLogin: {
    color: Theme.txtWhite,
    fontSize: Theme.txtMedium2,
    fontWeight: "700",
  },
  txtNotAccount: {
    fontSize: Theme.txtSmall,
    textAlign: Theme.align,
    color: Theme.txtBlack,
  },
  wrapActIndicator: {
    position: "absolute",
    width: "100%",
    height: "10%",
    marginTop: "100%",
  },
  errorTxt: {
    fontSize: Theme.txtSmallest,
    color: "red",
  },
  txtLoading: {
    fontSize: Theme.txtMedium,
    color: Theme.primary,
    margin: "5%",
  },
  brnSocial: {
    width: Theme.wp("15%"),
    height: Theme.wp("15%"),
    alignItems: Theme.align,
    justifyContent: Theme.align,
    borderRadius: 90,
  },
  wrapSocial: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-between",
    marginTop: "10%",
    alignSelf: Theme.align,
  },
});

export default styles;
