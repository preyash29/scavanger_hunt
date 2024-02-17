import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import Header from "../../Components/Headers/Headers";
import styles from "./Style";
import Theme from "../../Utils/Theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import { Formik } from "formik";
import * as yup from "yup";
const reviewSchema = yup.object({
  Email: yup.string().email("Invalid email").required(),
  Password: yup.string().required("Password field not empty"),
});
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, Setloader] = useState(false);

  const loginFunc = (Email, Password) => {
    Setloader(true);
    auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        Setloader(false);
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
        Setloader(false);
        Alert.alert(error.code, error.message);
      });
  };

  return (
    <View style={styles.MainView}>
      <Header label={"Login"} headerLogin={true} />

      <Image
        source={require("../../Assets/Logo.png")}
        style={styles.imgSplash}
      />

      <Formik
        initialValues={{ Email: email, Password: password }}
        validationSchema={reviewSchema} //check validation
        onSubmit={(values, actions) => {
          // action is use  for call reset form
          actions.resetForm();
          loginFunc(values.Email, values.Password);
        }}
      >
        {(props) => (
          <View style={styles.wrapEmailPass}>
            <TextInput
              // label="Input Email"
              placeholder="Input Email"
              placeholderTextColor={Theme.primary}
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
              // label="Input Password"
              placeholderTextColor={Theme.primary}
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
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={props.handleSubmit}
              // onPress={() => navigation.navigate('UserSideMap')}
            >
              <Text style={styles.txtLogin}>Login</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: Theme.hp("5%"),
              }}
            >
              <Text style={styles.txtNotAccount}>Not have account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignupScreen")}
              >
                <Text style={{ color: Theme.primary, fontWeight: "bold" }}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <View style={styles.wrapSocial}>
        <TouchableOpacity
          style={{ ...styles.brnSocial, backgroundColor: "#4267B2" }}
        >
          <FontAwesome
            name="facebook"
            color={Theme.white}
            size={Theme.iconSize}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.brnSocial, backgroundColor: "#db3236" }}
        >
          <FontAwesome
            name="google"
            color={Theme.white}
            size={Theme.iconSize}
          />
        </TouchableOpacity>
      </View>

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
          <Text style={styles.txtLoading}>Loging In...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Login;
