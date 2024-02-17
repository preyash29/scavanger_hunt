/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  AsyncStorage,
} from "react-native";
import Header from "../../Components/Headers/Headers";
import styles from "./Style";
import Theme from "../../Utils/Theme";
import { Formik } from "formik";
import * as yup from "yup";
import database from "@react-native-firebase/database";
import { db, auth } from "../../Utils/Exports";
// import auth from '@react-native-firebase/auth';
const reviewSchema = yup.object({
  Username: yup
    .string()
    .min(3, "Input full name")
    .required()
    .max(15, "Input short name"),

  Email: yup.string().email("Invalid email").required(),
  Password: yup.string().min(8, "Minimun length of 8 character").required(),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required(""),
});
const SignupScreen = ({ navigation }) => {
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confpassword, setConfPassword] = React.useState("");
  const [loader, Setloader] = React.useState(false);

  const signUpAuth = (Username, Email, Password) => {
    console.log("UserNAme-", Username);
    Setloader(true);

    auth
      .createUserWithEmailAndPassword(Email, Password, Username)
      .then(() => {
        const currentUid = auth.currentUser.uid;
        db.ref("Users/" + currentUid).set({
          Name: Username,
          Email: Email,
          uid: auth.currentUser.uid,
        });
        navigation.replace("chooseSide");
      })

      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Setloader(false);
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          Setloader(false);
          alert("That email address is invalid!");
        }

        // console.error(error);
        Setloader(false);
        alert(error);
      });
  };

  return (
    <View style={styles.MainView}>
      <Header label={"SignUp"} headerLogin={true} />
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
      </Formik>

      <Modal visible={loader}>
        <View
          style={{
            flex: 1,
            alignItems: Theme.align,
            justifyContent: Theme.align,
            backgroundColor: Theme.white,
          }}
        >
          <Image
            source={require("../../Assets/Logo.png")}
            style={{ ...styles.imgSplash, bottom: "10%" }}
          />
          <ActivityIndicator size="large" color={Theme.primary} />
          <Text style={styles.txtLoading}>Loading please wait...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default SignupScreen;
