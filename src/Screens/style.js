import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: '#DBDBDB',
  },

  setWidth: {
    width: Theme.width,
    alignSelf: Theme.align,
  },
  txtQueQty: {
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
    marginTop: '20%',
    width: '85%',
    // backgroundColor: 'red',
  },
  paginationText: {
    color: 'black',
    fontSize: 30,
  },
  paginationStyle: {
    position: 'absolute',
    marginTop: '14%',
    right: 10,
  },
  inputTxtPlace: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginTop: '5%',
    color: 'black',
  },
  errorTxt: {
    fontSize: Theme.txtSmallest,
    color: 'red',
  },
  btnEnter: {
    backgroundColor: Theme.primary,
    width: Theme.wp('30%'),
    height: Theme.wp('10%'),
    alignItems: Theme.align,
    justifyContent: Theme.align,
    borderRadius: 10,
    alignSelf: Theme.align,
    marginTop: '7%',
  },
  txtEnter: {
    color: Theme.white,
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: Theme.align,
    justifyContent: 'flex-start',
    paddingLeft: 20,

    // paddingTop: 50,
    marginTop: '7%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  RadioBtnWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '5%',
    width: '90%',
    alignSelf: 'center',
  },
  RadioBtnWrapper2: {
    justifyContent: 'space-between',

    flexDirection: 'row',
    marginTop: '5%',
    paddingLeft: '7%',
    // width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  flexAlign2: {
    flexDirection: 'row',
    alignItems: Theme.align,
    // paddingLeft: 20,
    alignSelf: 'center',
    marginTop: '7%',
  },
  inputTxtOption: {
    borderWidth: 0.3,
    borderRadius: 5,
    width: Theme.wp('60%'),
    color: 'gray',
    left: 10,
  },
  txtOption: {
    color: Theme.txtBlack,
    fontWeight: Theme.bold,
    fontSize: Theme.txtMedium,
  },
  txtGoBack: {
    fontSize: Theme.txtMedium,
    fontWeight: Theme.bold,
    color: Theme.txtBlack,
  },
  btnGoBack: {
    borderWidth: 2,
    borderColor: Theme.primary,
    borderRadius: 10,
    width: Theme.wp('30%'),
    height: Theme.hp('7%'),
    alignItems: Theme.align,
    justifyContent: Theme.align,
  },
  imgTick: {
    width: Theme.wp('35%'),
    height: Theme.hp('15%'),
  },
  txtPost: {
    fontSize: Theme.txtMedium,
    margin: '5%',
    fontWeight: Theme.bold,
  },
  flexJustify: {
    flexDirection: 'row',
    alignItems: Theme.align,
    justifyContent: 'space-between',
    padding: '15%',
  },
});

export default styles;
