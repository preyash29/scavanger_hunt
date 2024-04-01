import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  setWidth: {
    alignSelf: Theme.align,
    width: Theme.width,
    marginTop: '15%',
  },
  txtTitle: {
    fontWeight: Theme.bold,
    fontSize: Theme.txtMedium,
    marginTop: '5%',
  },
  txtDesc: {
    fontSize: Theme.txtSmall,
    marginTop: '5%',
  },
});

export default styles;
