/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
// import Headers from "../Headers/Headers";
import Theme from "../../Utils/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Header from "../../Components/Headers/Headers";

const QuizModel = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Header
        label="Quiz Model"
        labelIcon={true}
        onPress={() => navigation.goBack()}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{ borderWidth: 2, borderRadius: 30, padding: 8 }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={{ fontSize: 20 }}>Check Model</Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.modalView}>
              <AntDesign
                name="closecircleo"
                color="red"
                style={{
                  fontSize: Theme.hp("5%"),
                  alignSelf: "flex-end",
                }}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 35,
                  // height: Theme.wp('30%'),
                  // width: Theme.hp('20%'),
                }}
              >
                <Image
                  source={require("../../Assets/placeholder.png")}
                  style={{ height: Theme.hp("15%"), width: Theme.wp("25%") }}
                />
                <Text
                  style={{ fontSize: 20, marginTop: 20, textAlign: "center" }}
                >
                  You can add your Quiz or Record
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: Theme.hp("5%"),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddQuiz");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Theme.primary,
                      height: Theme.hp("7%"),
                      width: Theme.wp("25%"),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      borderWidth: 1,
                      marginRight: 45,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: Theme.white }}>
                      Add Quiz
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SoundHome");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Theme.primary,
                      height: Theme.hp("7%"),
                      width: Theme.wp("25%"),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      borderWidth: 1,
                    }}
                  >
                    <Text style={{ fontSize: 15, color: Theme.white }}>
                      Add Record
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default QuizModel;

const styles = StyleSheet.create({
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  height: Theme.hp("22%"),
});
