import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

const Check = props => {
  const [showAlert, SetshowAlert] = useState(false);

  const showDialog = () => {
    SetshowAlert(true);
  };
  const hideAlert = () => {
    SetshowAlert(false);
  };
  return (
    <View style={styles.container}>
      <Text>I'm AwesomeAlert</Text>
      <TouchableOpacity
        onPress={() => {
          showDialog();
        }}>
        <View style={styles.button}>
          <Text style={styles.text}>Try me!</Text>
        </View>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="AwesomeAlert"
        message="I have a message for you!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          hideAlert();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
export default Check;
