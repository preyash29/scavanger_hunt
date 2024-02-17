/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    justifyContent: "center",
    // marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  setQuestion: {
    fontSize: Theme.txtMedium2,
    marginTop: 60,
  },
  option1: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  txtSize: {
    fontSize: Theme.optionsize,
  },
  option2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrpbtn: {
    backgroundColor: Theme.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Theme.hp("10%"),
    height: 50,
    width: 50,
    alignSelf: "flex-end",
    // borderRadius: 18,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 5,
  },
});

export default styles;
