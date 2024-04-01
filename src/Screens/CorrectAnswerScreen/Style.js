/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  setQuestion: {
    fontSize: Theme.txtMedium1,
    marginTop: 50,
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
    marginTop: Theme.hp("25%"),
    marginHorizontal: Theme.wp("25%"),
    borderRadius: 18,
    elevation: 5,
  },
});

export default styles;
