/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
// import {TextInput} from 'react-native-paper';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  AsyncStorage,
  TextInput,
} from 'react-native';
import Header from '../../Components/Headers/Headers';
import styles from './Style';
import Theme from '../../Utils/Theme';
import {Formik} from 'formik';
import * as yup from 'yup';
import database from '@react-native-firebase/database';
import {db, auth} from '../../Utils/Exports';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import auth from '@react-native-firebase/auth';
const reviewSchema = yup.object({
  Username: yup
    .string()
    .min(3, 'Input full name')
    .required()
    .max(15, 'Input short name'),

  Email: yup.string().email('Invalid email').required(),
  Password: yup.string().min(8, 'Minimun length of 8 character').required(),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref('Password'), null], 'Passwords must match')
    .required(''),
});
const SignupScreen = ({navigation}) => {
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confpassword, setConfPassword] = React.useState('');
  const [loader, Setloader] = React.useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmpasswordVisibility, confirmsetPasswordVisibility] =
    useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const confirmPasswordVisibility = () => {
    confirmsetPasswordVisibility(!confirmpasswordVisibility);
  };
  const signUpAuth = (Username, Email, Password) => {
    console.log('UserNAme-', Username);
    Setloader(true);

    auth
      .createUserWithEmailAndPassword(Email, Password, Username)
      .then(() => {
        const currentUid = auth.currentUser.uid;
        db.ref('Users/' + currentUid).set({
          Name: Username,
          Email: Email,
          uid: auth.currentUser.uid,
        });
        navigation.replace('chooseSide');
      })

      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Setloader(false);
          alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Setloader(false);
          alert('That email address is invalid!');
        }

        // console.error(error);
        Setloader(false);
        alert(error);
      });
  };

  return (
    <View style={styles.MainView}>
      {/* <Header label={"SignUp"} headerLogin={true} /> */}
      {/* <Formik
        initialValues={{
          Username: userName,
          Email: email,
          Password: password,
          ConfirmPassword: confpassword,
        }}
        validationSchema={reviewSchema} //check validation
        onSubmit={(values, actions) => {
          // action is use  for call reset form
          actions.resetForm();
          // console.log(values.Username, values.Email, values.Password);
          signUpAuth(values.Username, values.Email, values.Password);
        }}
      >
        {(props) => (
          <ScrollView>
            <Image
              source={require("../../Assets/Logo.png")}
              style={styles.imgSplash}
            />
            <View style={styles.wrapEmailPass}>
              <TextInput
                placeholder="Input Username"
                value={props.values.Username}
                onChangeText={props.handleChange("Username")}
                style={styles.txtInput}
                selectionColor={Theme.lightBlue}
                mode="outlined"
                outlineColor={Theme.primary}
              />
              <Text style={styles.errorTxt}>
                {props.touched.Username && props.errors.Username}
              </Text>
              <TextInput
                placeholder="Input Email"
                value={props.values.Email}
                onChangeText={props.handleChange("Email")}
                style={styles.txtInput}
                selectionColor={Theme.lightBlue}
                mode="outlined"
                outlineColor={Theme.primary}
              />
              <Text style={styles.errorTxt}>
                {props.touched.Email && props.errors.Email}
              </Text>
              <TextInput
                placeholder="Input Password"
                value={props.values.Password}
                onChangeText={props.handleChange("Password")}
                secureTextEntry={true}
                style={styles.txtInput}
                selectionColor={Theme.lightBlue}
                mode="outlined"
                outlineColor={Theme.primary}
              />
              <Text style={styles.errorTxt}>
                {props.touched.Password && props.errors.Password}
              </Text>
              <TextInput
                placeholder="Confirm Password"
                value={props.values.ConfirmPassword}
                onChangeText={props.handleChange("ConfirmPassword")}
                secureTextEntry={true}
                style={styles.txtInput}
                selectionColor={Theme.lightBlue}
                mode="outlined"
                outlineColor={Theme.primary}
              />
              <Text style={styles.errorTxt}>
                {props.touched.ConfirmPassword && props.errors.ConfirmPassword}
              </Text>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={props.handleSubmit}
              >
                <Text style={styles.txtLogin}>SignUp</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Theme.hp("4%"),
                }}
              >
                <Text style={styles.txtNotAccount}>Already have account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace("LoginScreen")}
                >
                  <Text style={{ color: Theme.primary, fontWeight: "bold" }}>
                    SignIn
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik> */}
      <View style={styles.applogo}>
        <Image
          source={require('../../Assets/Logo.png')}
          style={styles.imgSplash}
        />
        <View style={styles.loginText}>
          <Text style={styles.loginStyle}>Sign Up</Text>
        </View>
      </View>
      <View style={styles.frameText}>
        <View>
          <Image
            source={require('../../Assets/images/frame.png')}
            style={styles.frameLogo}></Image>
        </View>
      </View>
      <View style={styles.accountText}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: '#9FBFF4'}}>
            Get started by creating your account
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{
          Username: userName,
          Email: email,
          Password: password,
          ConfirmPassword: confpassword,
        }}
        validationSchema={reviewSchema} //check validation
        onSubmit={(values, actions) => {
          // action is use  for call reset form
          actions.resetForm();
          // console.log(values.Username, values.Email, values.Password);
          signUpAuth(values.Username, values.Email, values.Password);
        }}>
        {props => (
          // <ScrollView>
          <View style={styles.signupTextInputMain}>
            <ScrollView>
              <View style={styles.textInputView}>
                <View style={styles.textInputRadius}>
                  <View style={styles.emailIcon}>
                    <Feather name="user" color="#FF4A4A" size={20} />
                  </View>
                  <TextInput
                    placeholder="Input Username"
                    placeholderTextColor={isFocused ? '#7B78AA' : '#7B78AA'}
                    style={styles.emailInput}
                    value={props.values.Username}
                    onChangeText={props.handleChange('Username')}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
                <Text style={styles.errorTxt}>
                  {props.touched.Username && props.errors.Username}
                </Text>
                <View style={styles.textInputRadius}>
                  <View style={styles.emailIcon}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      color="#FF4A4A"
                      size={20}
                    />
                  </View>
                  <TextInput
                    placeholder="Input Email"
                    placeholderTextColor={isFocused ? '#7B78AA' : '#7B78AA'}
                    style={styles.emailInput}
                    value={props.values.Email}
                    onChangeText={props.handleChange('Email')}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
                <Text style={styles.errorTxt}>
                  {props.touched.Email && props.errors.Email}
                </Text>
                <View style={styles.textInputRadius}>
                  <View style={styles.emailIcon}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      color="#FF4A4A"
                      size={20}
                    />
                  </View>
                  <TextInput
                    placeholder="Input Password"
                    placeholderTextColor={isFocused ? '#7B78AA' : '#7B78AA'}
                    style={styles.passwordInput}
                    value={props.values.Password}
                    onChangeText={props.handleChange('Password')}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={passwordVisibility}
                  />
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={{}}>
                    <MaterialCommunityIcons
                      name={
                        passwordVisibility ? 'eye-outline' : 'eye-off-outline'
                      }
                      color="#FF4A4A"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.errorTxt}>
                  {props.touched.Password && props.errors.Password}
                </Text>
                <View style={styles.textInputRadius}>
                  <View style={styles.emailIcon}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      color="#FF4A4A"
                      size={20}
                    />
                  </View>
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={isFocused ? '#7B78AA' : '#7B78AA'}
                    style={styles.passwordInput}
                    value={props.values.ConfirmPassword}
                    onChangeText={props.handleChange('ConfirmPassword')}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={confirmpasswordVisibility}
                  />
                  <TouchableOpacity
                    onPress={confirmPasswordVisibility}
                    style={{}}>
                    <MaterialCommunityIcons
                      name={
                        confirmpasswordVisibility
                          ? 'eye-outline'
                          : 'eye-off-outline'
                      }
                      color="#FF4A4A"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.errorTxt}>
                  {props.touched.ConfirmPassword &&
                    props.errors.ConfirmPassword}
                </Text>
                <TouchableOpacity
                style={styles.loginBtn}
                onPress={props.handleSubmit}>
                <LinearGradient
                  colors={['#FF4A4A', '#852626']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.linearStyle}>
                  <View style={styles.LoginViw}>
                    <Text style={styles.loginTxt}>Sign Up</Text>
                  </View>
                </LinearGradient>
                </TouchableOpacity>
                <View style={styles.signUpTxt}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={{color: '#9C9B9B', fontSize: 15}}>
                  Already have account?{' '}
                    <Text style={{color: '#BD3737'}}>SignIn</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
      <Modal visible={loader}>
        <View
          style={{
            flex: 1,
            alignItems: Theme.align,
            justifyContent: Theme.align,
            backgroundColor: '#19173D',
          }}>
          <Image
            source={require('../../Assets/Logo.png')}
            style={{...styles.imgSplash, bottom: '10%'}}
          />
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{color:'#fff'}}>Loading please wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default SignupScreen;
