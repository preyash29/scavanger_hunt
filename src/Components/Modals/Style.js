import { StyleSheet, Dimensions } from "react-native";
import Theme from "../../Utils/Theme";
const styles = StyleSheet.create({
  modalWrap: {
    flex: 1,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  txtLoading: {
    fontSize: Theme.txtMedium,
    color: Theme.white,
    marginTop: "5%",
    fontWeight: "600",
  },
  indicator: {
    margin: "5%",
  },
  // MODAL STYLES
  modalWrapper: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: Theme.wp("3%"),
    ...Theme.shadow,
  },
  heading: {
    alignSelf: "center",
    marginTop: 10,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  txtTitle: {
    fontSize: Theme.txtMedium1,
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
    textAlign: Theme.align,
    margin: "5%",
  },
  bottomView: {
    marginTop: Theme.hp("2%"),
    // height: Theme.hp("18%"),
    // width: Theme.wp("100%"),
    // position: "absolute",
    // bottom: 0,
  },
  circle: {
    backgroundColor: "#6d6d6d",
    width: Theme.wp("18%"),
    height: Theme.wp("18%"),
    borderRadius: 90,
    alignSelf: Theme.align,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  circle1: {
    backgroundColor: "#000",
    width: Theme.wp("14%"),
    height: Theme.wp("14%"),
    borderRadius: 90,
    alignSelf: Theme.align,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  circle2: {
    backgroundColor: "#fff",
    width: Theme.wp("11%"),
    height: Theme.wp("11%"),
    borderRadius: 90,
    alignSelf: Theme.align,
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  circle3: {
    backgroundColor: "red",
    width: Theme.wp("6%"),
    height: Theme.wp("6%"),
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
  recGif: {
    height: 25,
    width: 30,
    resizeMode: "center",
    position: "absolute",
    right: 0,
    top: 10,
  },
  ///////////////
  txtTitle: {
    fontSize: Theme.txtMedium1,
    color: Theme.txtWhite,
    fontWeight: Theme.bold,
    textAlign: Theme.align,
    margin: "5%",
  },
  txtNoData: {
    color: "#fff",
    fontWeight: "100",
    textAlign: Theme.align,
    paddingVertical: "60%",
    fontSize: 30,
  },
  wrapContent: {
    width: "100%",
  },
  txtName: {
    color: Theme.black,
    fontSize: Theme.txtMedium,
  },
  flexJustify: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "3%",
    borderBottomColor: Theme.white,
    paddingVertical: "2%",
    alignItems: Theme.align,
  },
  imgPauseBtn: {
    width: Theme.wp("8%"),
    height: Theme.wp("8%"),
    tintColor: "#000",
  },
  dd: {},
  playPauseBtnsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: Theme.hp("2%"),
  },
});

export default styles;
