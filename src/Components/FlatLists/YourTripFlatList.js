import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import Theme from "../../Utils/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./Style";
const YourTripFlatList = (props) => {
  const { YourTripFlatList, YourTripData } = props;
  // console.warn(YourTripData);

  return (
    <>
      <FlatList
        data={YourTripData}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.setflatListWid}>
              <View style={styles.wrap50}>
                <Text>{item.location}</Text>
              </View>
              <View style={styles.wrap50}>
                <Text>{item.date}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};
export default YourTripFlatList;
