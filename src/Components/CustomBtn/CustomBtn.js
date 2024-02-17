import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Theme from "../../Utils/Theme";

const CustomBtn = ({ onPress = () => {}, btnStyle = {}, btnText }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.btnStyle, ...btnStyle }}
    >
      <Text style={{ color: "white" }}>{btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 35,
    width: "45%",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Theme.primary,
    elevation: 3,
    borderWidth: 0.5,
  },
});
export default CustomBtn;
