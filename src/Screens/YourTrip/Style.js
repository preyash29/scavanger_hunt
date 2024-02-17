import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../../Utils/Theme';
const styles = StyleSheet.create({
  MainView: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  setWidth: {
    width: Theme.width,
    marginTop: '15%',
    alignSelf: Theme.align,
  },
});

export default styles;
