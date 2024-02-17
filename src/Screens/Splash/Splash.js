import React, { useEffect } from "react";
import { View, Image, Text } from "react-native";
import styles from "./Style";
import { auth } from "../../Utils/Exports";
const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // Signed In
          navigation.replace("chooseSide");
          console.log("Signed In");
        } else {
          // Signed Out
          navigation.replace("LoginScreen");
          console.log("Signed Out");
        }
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.MainView}>
      <Image
        source={require("../../Assets/Logo.png")}
        style={styles.imgSplash}
      />
      <Text style={styles.txtScavenger}>Scavenger</Text>
    </View>
  );
};
export default Splash;
