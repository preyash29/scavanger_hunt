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
    marginTop: Theme.hp("5%"),
  },
  wrapTxtEdit: {
    backgroundColor: Theme.primary,
    width: "15%",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    right: 10,
    top: 10,
  },
  txtEdit: {
    fontSize: Theme.txtMedium,
    color: Theme.white,
    fontWeight: Theme.bold,
  },
  imgProfile: {
    width: "100%",
    height: "100%",
    borderRadius: 90,
  },
  txtEmail: {
    fontSize: Theme.txtSmall,
    fontWeight: Theme.bold,
    // marginTop: '5%',
  },
  flexJustify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5%",
    paddingHorizontal: Theme.wp("2%"),
    paddingBottom: Theme.hp("0.5%"),
    marginHorizontal: Theme.wp("2%"),
    width: "100%",
    borderBottomWidth: 1,
    alignSelf: "center",
  },
  wrap40: {
    width: "40%",
  },
  wrap60: {
    width: "60%",
  },
  wrapImg: {
    width: Theme.wp("38%"),
    height: Theme.wp("38%"),
    alignSelf: Theme.align,
    justifyContent: Theme.align,
    alignItems: Theme.align,
    borderWidth: 5,
    borderRadius: 90,
    borderColor: Theme.primary,
    ...Theme.shadow,
  },
  txtAddImg: {
    fontSize: Theme.txtSmall,
    textAlign: Theme.align,
    marginTop: "5%",
  },
  personalDetailsContainer: {
    width: Theme.wp("95%"),
    alignSelf: "center",
    marginTop: Theme.hp("5%"),
  },
  editContainer: {
    // position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    width: Theme.wp("34.9%"),
    alignItems: "center",
    height: Theme.hp("2.5%"),
    borderRadius: Theme.wp("3%"),
    marginTop: Theme.hp("1%"),
    alignSelf: "center",
  },
  txtPersonalDetails: {
    fontSize: Theme.txtMedium2,
    fontWeight: "700",
    textDecorationLine: "underline",
    fontStyle: "italic",
  },
  modalCloseBtn: {
    marginRight: Theme.wp("2%"),
    marginTop: Theme.hp("1%"),
    alignSelf: "flex-end",
  },
});

export default styles;
