import React, { useState } from "react";
import { View } from "react-native";
import styles from "./Style";

import Header from "../../Components/Headers/Headers";
import YourTripFlatList from "../../Components/FlatLists/YourTripFlatList";
const YourTrip = ({ navigation }) => {
  const [YourTripData] = useState([
    {
      date: "28-feb-2021",
      location: "Murree Hills",
    },
    {
      date: "07-jan-2020",
      location: "Murree Hills",
    },
    {
      date: "12-aug-2020",
      location: "Lahore",
    },
    {
      date: "24-sep-2020",
      location: "London",
    },
  ]);
  return (
    <View style={styles.MainView}>
      <Header
        label="Your Trips"
        labelIcon={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.setWidth}>
        <YourTripFlatList YourTripData={YourTripData} />
      </View>
    </View>
  );
};
export default YourTrip;
