import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
    paddingBottom: Theme.hp("10%"),
  },

  txtScavenger: {
    color: Theme.primary,
    fontSize: Theme.txtLarge,
    fontWeight: Theme.bold,
  },
  setWidth: {
    width: Theme.width,
    alignSelf: Theme.align,
  },
  btnAddQuiz: {
    backgroundColor: Theme.primary,
    width: Theme.wp("25%"),
    height: Theme.hp("6%"),
    margin: "5%",
    alignSelf: "flex-end",
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  txtAddQuiz: {
    color: Theme.txtBlack,
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
    margin: "3%",
  },
  txtLocName: {
    fontSize: Theme.txtMedium,
  },
  imgMap: {
    width: Theme.wp("100%"),
    height: Theme.hp("35%"),
  },
  inputTxtPlace: {
    borderWidth: 0.5,
    width: Theme.wp("90%"),
    alignSelf: Theme.align,
    padding: "3%",
    borderRadius: 5,
  },
  inputTxtInfo: {
    borderWidth: 0.5,
    width: Theme.wp("90%"),
    alignSelf: Theme.align,
    padding: "3%",
    borderRadius: 5,
    height: Theme.hp("20%"),
    textAlignVertical: "top",
  },

  btnAddPost: {
    backgroundColor: Theme.primary,
    width: Theme.wp("90%"),
    height: "12%",
    alignSelf: Theme.align,
    marginTop: "5%",
    alignItems: Theme.align,
    justifyContent: Theme.align,
    borderRadius: 10,
  },
  txtAddPost: {
    fontSize: Theme.txtMedium2,
    color: Theme.txtWhite,
    fontWeight: "bold",
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
    width: Theme.wp("80%"),
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
  txtGoBack: {
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
    color: Theme.txtBlack,
  },
  txtPostInfo: {
    color: Theme.txtBlack,
    fontSize: Theme.txtMedium2,
    fontWeight: Theme.bold,
  },
});

export default styles;
