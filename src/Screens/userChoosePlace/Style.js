import { StyleSheet } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  searchInputContainer: {
    alignSelf: "center",
    width: Theme.width,
    borderWidth: 1,
    borderColor: "#77C2F8",
    borderRadius: 5,
    backgroundColor: Theme.lightGray,
    marginVertical: Theme.hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    ...Theme.shadow,
    shadowColor: Theme.primary,
  },
  searchTxtInp: {
    width: Theme.wp("86%"),
    alignSelf: Theme.align,
    borderRadius: 5,
    paddingHorizontal: Theme.wp("3%"),
  },
});

export default styles;
