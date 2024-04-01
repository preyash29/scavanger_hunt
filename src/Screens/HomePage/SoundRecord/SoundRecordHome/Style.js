import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.primary,
  },
  txtTitle: {
    fontSize: Theme.txtMedium1,
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
    textAlign: Theme.align,
    margin: "5%",
  },
  bottomView: {
    height: Theme.hp("18%"),
    width: Theme.wp("100%"),
    position: "absolute",
    bottom: 0,
  },
  circle: {
    backgroundColor: "#6d6d6d",
    width: Theme.wp("25%"),
    height: Theme.wp("25%"),
    borderRadius: 90,
    alignSelf: Theme.align,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  circle1: {
    backgroundColor: "#000",
    width: Theme.wp("20%"),
    height: Theme.wp("20%"),
    borderRadius: 90,
    alignSelf: Theme.align,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  circle2: {
    backgroundColor: "#fff",
    width: Theme.wp("18%"),
    height: Theme.wp("18%"),
    borderRadius: 90,
    alignSelf: Theme.align,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  circle3: {
    backgroundColor: "red",
    width: Theme.wp("8%"),
    height: Theme.wp("8%"),
    borderRadius: 90,
    alignSelf: Theme.align,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  hh: {
    alignItems: "center",
  },
  wraptxtRecord: {
    position: "absolute",
    bottom: "10%",
    right: "5%",
    backgroundColor: "#787878",
    width: Theme.wp("30%"),
    height: Theme.hp("5%"),
    alignItems: Theme.align,
    justifyContent: Theme.align,
    borderRadius: 5,
  },
  txtRecord: {
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
  },
  logo: {
    width: 20,
    height: 20,
  },
  txtConn: {
    color: Theme.white,
    fontSize: 7,
    marginTop: "5%",
  },
});

export default styles;
