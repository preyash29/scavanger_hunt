import { StyleSheet } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    alignItems: Theme.align,
    backgroundColor: Theme.white,
    justifyContent: Theme.align,
  },
  imgSplash: {
    marginTop: -Theme.hp("2%"),
    width: Theme.wp("40%"),
    height: Theme.wp("40%"),
    resizeMode: "center",
  },
  txtScavenger: {
    color: Theme.primary,
    fontSize: Theme.txtLarge,
    fontWeight: Theme.bold,
    marginTop: Theme.hp("2%"),
  },
});

export default styles;
