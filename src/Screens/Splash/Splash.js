import React, {useEffect} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import styles from './Style';
import {auth} from '../../Utils/Exports';
const {width, height} = Dimensions.get('window');

const Splash = ({navigation}) => {
  useEffect(() => {
    const handleAuthStateChange = (user) => {
      if (user) {
        navigation.replace("userChoosePlace");
        console.log("Signed In");
      } else {
        navigation.replace("LoginScreen");
        console.log("Signed Out");
      }
    };
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);
        return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.MainView}>
      <View
        style={{
          // backgroundColor: 'red',
          flex: 0.6,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../Assets/Logo.png')}
          style={{
            width: width * 0.4,
            height: height * 0.4,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{alignSelf: 'center', position: 'absolute', bottom: 0}}>
        <Image
          source={require('../../Assets/images/frame.png')}
          style={{width: (width * 100) / 100, resizeMode: 'stretch'}}></Image>
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          Scavenger
        </Text>
      </View>
    </View>
  );
};

export default Splash;
