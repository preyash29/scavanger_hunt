import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./style";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Theme from "../../Utils/Theme";
import Header from "../../Components/Headers/Headers";

const chooseSide = ({ navigation }) => {
  const chooseSideOptions = [
    {
      title: "User Mode",
      iconName: "human",
      navigateTo: "userChoosePlace",
    },
    {
      title: "Creator Mode",
      iconName: "directions",
      navigateTo: "DrawerNavigation",
    },
    // {
    //   title: "Quiz Model",
    //   iconName: "file-edit-outline",
    //   navigateTo: "quizmodel",
    // },
    // {
    //   title: "User Quiz",
    //   iconName: "file-edit-outline",
    //   navigateTo: "enterquiz",
    // },
    // {
    //   title: "Record",
    //   iconName: "record-rec",
    //   navigateTo: "SoundHome",
    // },
  ];
  return (
    <View style={styles.MainView}>
      <Header
        label={"Choose Your Side"}
        headerLogin={true}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.txtTitle}>What Type of Mode Suits You Best?</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.chooseSideOptions}>
          {chooseSideOptions.map((item, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              style={styles.wrapBtn}
              onPress={() => {
                navigation.navigate(item.navigateTo);
              }}
            >
              <View style={styles.wrapInside}>
                <MCIcon
                  name={item.iconName}
                  size={Theme.RFPercentage(4.5)}
                  color={Theme.white}
                />
              </View>
              <Text style={styles.txtPhone}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default chooseSide;
