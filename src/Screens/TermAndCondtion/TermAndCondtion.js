import React, { useEffect, useState } from "react";
import { View, Image, ScrollView, Text } from "react-native";
import styles from "./Style";
import Header from "../../Components/Headers/Headers";
import Language from "../../Utils/Language";
const TermAndCondtion = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.MainView}>
        <Header
          label="Term And Condtion"
          labelIcon={true}
          onPress={() => navigation.goBack()}
        />

        <View style={styles.setWidth}>
          <Text style={styles.txtTitle}>{Language.titleWelcome}</Text>
          <Text style={styles.txtDesc}>{Language.descWelcome}</Text>

          <Text style={styles.txtTitle}>{Language.titleAccess}</Text>
          <Text style={styles.txtDesc}>{Language.descAccess}</Text>

          <Text style={styles.txtTitle}>{Language.titleServices}</Text>
          <Text style={styles.txtDesc}>{Language.descServices}</Text>

          <Text style={styles.txtTitle}>{Language.titleChangeServices}</Text>
          <Text style={styles.txtDesc}>{Language.descChangeServices}</Text>

          <Text style={styles.txtTitle}>{Language.titleIntellectual}</Text>
          <Text style={styles.txtDesc}>{Language.descIntellectual}</Text>

          <Text style={styles.txtTitle}>{Language.titlePrivacy}</Text>
          <Text style={styles.txtDesc}>{Language.descPrivacy}</Text>

          <Text style={styles.txtTitle}>{Language.titleIntegrity}</Text>
          <Text style={styles.txtDesc}>{Language.descIntegrity}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default TermAndCondtion;
