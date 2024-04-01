//import liraries
import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

// create a component
const TextInputs = (props) => {
  const {
    onChange,
    value,
    flatlistdata,
    whenPressed,
    keyExtractor,
    textPress,
    inputRef,
    onSubmitEditing,
  } = props;
  const ref_input = useRef();
  const billingFirstNameInput = useRef(null);
  const navigation = useNavigation();
  //   const [DATA, setDATA] = useState([
  //     {
  //       name: 'Yasir',
  //     },
  //     {
  //       name: 'Ahsan',
  //     },
  //   ]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={flatlistdata}
        // keyExtractor={(item, index) => index.toString()}
        keyExtractor={(item) => item.id}
        // keyExtractor={keyExtractor}
        renderItem={({ item, index }) => {
          //   console.log(index);

          return (
            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >
              {/* <Text>{item.name}</Text> */}
              <TextInput
                // placeholder={'hello'}
                value={value}
                ref={inputRef}
                returnKeyType="next"
                autoFocus={true}
                // onSubmitEditing={() => ref_input.current.focus()}
                onSubmitEditing={onSubmitEditing}
                style={{
                  borderWidth: 1,
                  marginTop: "5%",
                  borderColor: "#66B5EB",
                  borderRadius: 7,
                  width: "80%",
                  backgroundColor: "#66B5EB",
                }}
                editable={true}
                onPressIn={whenPressed}
              />

              {/* <Text
                onPress={textPress}
                style={{fontSize: 22, alignSelf: 'flex-end'}}>
                X
              </Text> */}
            </View>
          );
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  descTxt: {
    width: "100%",

    color: "black",
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: "#8EC2E2",
    marginBottom: 17,
  },
});

export default TextInputs;
