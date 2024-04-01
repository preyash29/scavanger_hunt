import React, {useEffect, useState} from 'react';
// import {TextInput} from 'react-native-paper';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
  Button,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../Components/Headers/Headers';
import styles from './Style';
import Theme from '../../Utils/Theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const {width, height} = Dimensions.get('window');

import {Formik} from 'formik';
import * as yup from 'yup';

const reviewSchema = yup.object({
  Email: yup
    .string()
    .email('Invalid email')
    .required('please enter your email'),
  Password: yup.string().required('Please enter your password'),
});

const Login = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '150140357064-rkj52cjo32a5jvnm083jodh8k224pl5b.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  }, []);
  console.log(
    'Web Client ID:',
    '150140357064-rkj52cjo32a5jvnm083jodh8k224pl5b.apps.googleusercontent.com',
  );
  // useEffect(() => {
  //   GoogleSignin.configure({
  //       androidClientId: '150140357064-2bprk2i25j6bnspmj07gh95veukcfj8p.apps.googleusercontent.com',
  //   });
  // }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, Setloader] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const loginFunc = (Email, Password) => {
    Setloader(true);
    auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        Setloader(false);
        navigation.replace('userChoosePlace');
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
        Setloader(false);
        Alert.alert(error.code, error.message);
      });
  };

  const signIn = async () => {
    try {
      Setloader(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Setloader(false);
      console.log('User Info:', userInfo);
      console.log('User Email:', userInfo?.user?.email);
      console.log('User token:', userInfo?.idToken);

      setUserInfo(userInfo);
      navigation.replace('userChoosePlace');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play services not available or outdated');
      } else {
        console.error('Google sign-in error:', error);
        Setloader(false);
        Alert.alert('Error', error.message);
      }
    }
  };
  async function onFacebookButtonPress() {
    try {
      await logout();
      console.log('Attempting Facebook login...');
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        console.log('User cancelled the login process');
      } else {
        console.log('Facebook login successful. Retrieving access token...');
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          console.log('Something went wrong obtaining access token');
        } else {
          console.log('Access token retrieved. Logging in with Firebase...');
          const { accessToken } = data;
          console.log('Access token:', accessToken);
          const response = await fetch(`https://graph.facebook.com/v12.0/me?fields=id,name&access_token=${accessToken}`);
          const userData = await response.json();
          console.log('User data:', userData);
          const { name, id } = userData;
          console.log('User name:', name);
          console.log('User id:', id);
          const facebookCredential = auth.FacebookAuthProvider.credential(accessToken);
          await auth().signInWithCredential(facebookCredential);
          console.log('Firebase login successful.');
          navigation.replace('userChoosePlace');
        }
      }
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      Alert.alert('Error', error.message); 
    }
  }
  
  async function logout() {
    try {
      await LoginManager.logOut(); 
      await auth().signOut(); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  return (
    <View style={styles.MainView}>
      <View style={styles.applogo}>
        <Image
          source={require('../../Assets/Logo.png')}
          style={styles.imgSplash}
        />
        <View style={styles.loginText}>
          <Text style={styles.loginStyle}>Login</Text>
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

      {/* <View style={styles.textInputMain}>
        <View style={styles.textInputView}>
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
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
        </View>
        <View style={styles.textInputView}>
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
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => {}}>
          <LinearGradient
            colors={['#FF4A4A', '#852626']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.linearStyle}>
            <View style={styles.LoginViw}>
              <Text style={styles.loginTxt}>Login</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.signUpTxt}>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={{color: '#9C9B9B', fontSize: 15}}>
              Not have account ? <Text style={{color: '#BD3737'}}>Signup</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialLogin}>
          <TouchableOpacity onPress={() => {}} style={styles.googleLogin}>
            <Image
              source={require('../../Assets/glogo.png')}
              style={styles.glogin}
            />
            <Text style={styles.gLoginTxt}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.fLogin}>
            <Image
              source={require('../../Assets/images/flogo.png')}
              style={styles.fLogo}
            />
            <Text style={styles.FaceTxt}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View> */}

      <Formik
        initialValues={{Email: email, Password: password}}
        validationSchema={reviewSchema} //check validation
        onSubmit={(values, actions) => {
          // action is use  for call reset form
          actions.resetForm();
          loginFunc(values.Email, values.Password);
        }}>
        {props => (
          <View style={styles.textInputMain}>
            <ScrollView>
              <View style={styles.textInputView}>
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
              </View>
              {/* <View style={styles.textInputView}>
               
              </View> */}
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={props.handleSubmit}>
                <LinearGradient
                  colors={['#FF4A4A', '#852626']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.linearStyle}>
                  <View style={styles.LoginViw}>
                    <Text style={styles.loginTxt}>Login</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.signUpTxt}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignupScreen')}>
                  <Text style={{color: '#9C9B9B', fontSize: 15}}>
                    Not have account?{' '}
                    <Text style={{color: '#BD3737'}}>Signup</Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.socialLogin}>
                <TouchableOpacity
                  onPress={() => {
                    signIn(navigation);
                  }}
                  style={styles.googleLogin}>
                  <Image
                    source={require('../../Assets/glogo.png')}
                    style={styles.glogin}
                  />
                  <Text style={styles.gLoginTxt}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {onFacebookButtonPress()}} style={styles.fLogin}>
                  <Image
                    source={require('../../Assets/images/flogo.png')}
                    style={styles.fLogo}
                  />
                  <Text style={styles.FaceTxt}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>

      {/* <Formik
        initialValues={{Email: email, Password: password}}
        validationSchema={reviewSchema} //check validation
        onSubmit={(values, actions) => {
          // action is use  for call reset form
          actions.resetForm();
          loginFunc(values.Email, values.Password);
        }}>
        {props => (
          <View style={styles.wrapEmailPass}>
            <TextInput
              // label="Input Email"
              placeholder="Input Email"
              placeholderTextColor={Theme.primary}
              value={props.values.Email}
              onChangeText={props.handleChange('Email')}
              style={styles.txtInput}
              selectionColor={Theme.lightBlue}
              mode="outlined"
              outlineColor={Theme.primary}
            />
            <Text style={styles.errorTxt}>
              {props.touched.Email && props.errors.Email}
            </Text>
            <TextInput
              // label="Input Password"
              placeholderTextColor={Theme.primary}
              placeholder="Input Password"
              value={props.values.Password}
              onChangeText={props.handleChange('Password')}
              secureTextEntry={true}
              style={styles.txtInput}
              selectionColor={Theme.lightBlue}
              mode="outlined"
              outlineColor={Theme.primary}
            />
            <Text style={styles.errorTxt}>
              {props.touched.Password && props.errors.Password}
            </Text>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={props.handleSubmit}
              // onPress={() => navigation.navigate('UserSideMap')}
            >
              <Text style={styles.txtLogin}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: Theme.hp('5%'),
              }}>
              <Text style={styles.txtNotAccount}>Not have account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={{color: Theme.primary, fontWeight: 'bold'}}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik> */}
      {/* <View style={styles.wrapSocial}>
        <TouchableOpacity
          style={{...styles.brnSocial, backgroundColor: '#4267B2'}}>
          <FontAwesome
            name="facebook"
            color={Theme.white}
            size={Theme.iconSize}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            signIn(navigation);
          }}
          style={{...styles.brnSocial, backgroundColor: '#db3236'}}>
          <FontAwesome
            name="google"
            color={Theme.white}
            size={Theme.iconSize}
          />
        </TouchableOpacity> */}

      {/* <Button title={'Sign in with Google'} onPress={() =>  {
    
GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
             GoogleSignin.signIn().then((userInfo) => {
                       console.log(JSON.stringify(userInfo))
             }).catch((e) => {
             console.log("ERROR IS: " + JSON.stringify(e));
             })
        }
}).catch((e) => {
    console.log("ERROR IS: " + JSON.stringify(e));
})
}} /> */}
      {/* </View> */}

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
          <Text style={{color:'#fff'}}>Loging In...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
