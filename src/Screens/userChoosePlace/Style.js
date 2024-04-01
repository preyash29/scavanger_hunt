import { StyleSheet,Dimensions } from "react-native";
import Theme from "../../Utils/Theme";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: '#262450',
  },
  searchInputContainer: {
    alignSelf: "center",
    width: '90%',
    // borderWidth: 1,
    borderColor: "#77C2F8",
    borderRadius: 30,
    backgroundColor: '#19173D',
    marginVertical: Theme.hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:20
    // ...Theme.shadow,
    // shadowColor: Theme.primary,
  },
  searchTxtInp: {
    width: Theme.wp("86%"),
    alignSelf: Theme.align,
    // borderRadius: 5,
    paddingHorizontal: Theme.wp("3%"),
    borderRadius:30,
    color: '#7B78AA',
  },
  loginBtn: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 30,
    // paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000', //
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: (width * 50) / 100,
  },
  linearStyle: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: (width * 50) / 100,
    alignSelf: 'center',
  },
  LoginViw: {
    alignSelf: 'center',
  },
  loginTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
