import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: '#19173D',
  },
  applogo: {
    marginTop: 10,
    flex: 0.4,
  },
  loginText: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
  },
  loginStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff',
  },
  frameText: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  frameLogo: {
    width: (width * 100) / 100,
    height: (height * 80) / 100,
    resizeMode: 'stretch',
  },
  accountText: {
    flex: 0.1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: (width * 90) / 100,
    // backgroundColor:'red',
    marginTop: 20,
  },
  textInputMain: {
    flex: 0.5,
    alignSelf: 'center',
    width: (width * 100) / 100,
    // backgroundColor: 'red',
    // position:'relative',bottom:0
  },
  signupTextInputMain:{
    flex: 0.5,
    alignSelf: 'center',
    width: (width * 100) / 100,
    // backgroundColor:'red'
  },
  textInputView: {
    // marginTop: 20,
    alignSelf: 'center',
    // backgroundColor: 'yellow',
    // borderRadius: 30,
    padding: 6,
  },
  textInputRadius: {
    alignSelf: 'center',
    backgroundColor: '#19173D',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: width * 0.9,
    padding:5
    
  },
  emailIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 4,
  },
  emailInput: {
    flex: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#7B78AA',
  },
  passwordInput: {
    flex: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#7B78AA',
    // padding: 100,
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
    width: (width * 90) / 100,
  },
  linearStyle: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: (width * 90) / 100,
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
  signUpTxt: {
    alignSelf: 'center',
    margin: 10,
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
    width: (width * 90) / 100,
    alignSelf: 'center',
    // backgroundColor:'yellow',
    padding:10
  },
  googleLogin: {
    borderRadius: 30,
    padding: 14,
    backgroundColor: '#19173D',
    flexDirection: 'row',
    alignItems: 'center',
    width: (width * 35) / 100,
    justifyContent: 'space-evenly',
  },
  glogin: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  gLoginTxt: {
    color: '#6F6C9D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  fLogin: {
    borderRadius: 30,
    padding: 14,
    backgroundColor: '#19173D',
    flexDirection: 'row',
    alignItems: 'center',
    width: (width * 35) / 100,
    justifyContent: 'space-evenly',
  },
  fLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  FaceTxt: {
    color: '#6F6C9D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  imgSplash: {
    width: Theme.wp('30%'),
    height: Theme.wp('30%'),
    alignSelf: Theme.align,
    marginTop: '17%',
  },
  wrapEmailPass: {
    width: Theme.wp('90%'),
    alignSelf: Theme.align,
  },
  txtInput: {
    marginTop: Theme.hp('1.5%'),
    color: '#19173D', // Set text color here
    borderRadius: 30,
    // Other styles
  },
  roundTextInput: {
    borderRadius: 50, // Adjust the value as per your preference
  },
  btnLogin: {
    backgroundColor: Theme.primary,
    alignItems: Theme.align,
    justifyContent: Theme.align,
    marginTop: Theme.hp('4%'),
    height: Theme.hp('8%'),
    borderRadius: 5,
  },
  txtLogin: {
    color: Theme.txtWhite,
    fontSize: Theme.txtMedium2,
    fontWeight: '700',
  },
  txtNotAccount: {
    fontSize: Theme.txtSmall,
    textAlign: Theme.align,
    color: Theme.txtBlack,
  },
  wrapActIndicator: {
    position: 'absolute',
    width: '100%',
    height: '10%',
    marginTop: '100%',
  },
  errorTxt: {
    fontSize: Theme.txtSmallest,
    color: 'red',
  },
  txtLoading: {
    fontSize: Theme.txtMedium,
    color: Theme.primary,
    margin: '5%',
  },
  brnSocial: {
    width: Theme.wp('15%'),
    height: Theme.wp('15%'),
    alignItems: Theme.align,
    justifyContent: Theme.align,
    borderRadius: 90,
  },
  wrapSocial: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    marginTop: '10%',
    alignSelf: Theme.align,
  },
});

export default styles;
