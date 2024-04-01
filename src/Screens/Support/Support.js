import React from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./Style";
import Header from "../../Components/Headers/Headers";
import Language from "../../Utils/Language";
const Support = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.MainView}>
        <Header
          label="Support"
          labelIcon={true}
          onPress={() => navigation.goBack()}
        />

        <View style={styles.setWidth}>
          <Text style={styles.txtTitle}>{Language.titleScavenger}</Text>
          <Text style={styles.txtDesc}>{Language.descScavengerSupport}</Text>

          <Text style={styles.txtTitle}>{Language.titleRefund}</Text>
          <Text style={styles.txtDesc}>{Language.descRefund}</Text>

          <Text style={styles.txtTitle}>{Language.titleConfidentiality}</Text>
          <Text style={styles.txtDesc}>{Language.descConfidentiality}</Text>

          <Text style={styles.txtTitle}>{Language.titlePersonalInfo}</Text>
          <Text style={styles.txtDesc}>{Language.descPersonalInfo}</Text>

          <Text style={styles.txtTitle}>{Language.titleRetention}</Text>
          <Text style={styles.txtDesc}>{Language.descRetention}</Text>

          <Text style={styles.txtTitle}>{Language.titleCollection}</Text>
          <Text style={styles.txtDesc}>{Language.descCollection}</Text>

          <Text style={styles.txtTitle}>{Language.titleLaws}</Text>
          <Text style={styles.txtDesc}>{Language.descLaws}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default Support;
