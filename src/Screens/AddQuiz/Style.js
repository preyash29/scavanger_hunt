import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },

  setWidth: {
    width: Theme.width,
    alignSelf: Theme.align,
  },
  txtQueQty: {
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
    marginTop: "20%",
  },
  paginationText: {
    color: "black",
    fontSize: 30,
  },
  paginationStyle: {
    position: "absolute",
    marginTop: "14%",
    right: 10,
  },
  inputTxtPlace: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginTop: "5%",
    color: "black",
  },
  errorTxt: {
    fontSize: Theme.txtSmallest,
    color: "red",
  },
  btnEnter: {
    backgroundColor: Theme.primary,
    width: Theme.wp("30%"),
    height: Theme.wp("10%"),
    alignItems: Theme.align,
    justifyContent: Theme.align,
    borderRadius: 10,
    alignSelf: Theme.align,
    marginTop: "7%",
    marginBottom: "7%",
  },
  txtEnter: {
    color: Theme.white,
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
  },
  flexAlign: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    // marginTop: "7%",
  },
  flexAlign2: {
    flexDirection: "row",
    alignItems: Theme.align,
    // paddingLeft: 20,
    alignSelf: "center",
    marginTop: "7%",
  },
  inputTxtOption: {
    borderWidth: 0.3,
    borderRadius: 5,
    width: Theme.wp("65%"),
    color: "gray",
  },
  txtOption: {
    color: Theme.txtBlack,
    fontWeight: Theme.bold,
    fontSize: Theme.txtMedium,
  },
  txtGoBack: {
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
    color: Theme.txtBlack,
  },
  btnGoBack: {
    borderWidth: 2,
    borderColor: Theme.primary,
    borderRadius: 10,
    width: Theme.wp("30%"),
    height: Theme.hp("7%"),
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  imgTick: {
    width: Theme.wp("35%"),
    height: Theme.hp("15%"),
  },
  txtPost: {
    fontSize: Theme.txtMedium,
    margin: "5%",
    fontWeight: Theme.bold,
  },
  flexJustify: {
    flexDirection: "row",
    alignItems: Theme.align,
    justifyContent: "space-between",
    padding: "15%",
  },
});

export default styles;
