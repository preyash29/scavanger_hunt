import React from "react";
import { View, Text, StatusBar, Modal } from "react-native";
import Theme from "../../../Utils/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./Style";
const Audioheader = (props) => {
  const {
    headerLogin,
    label,
    headerThreeComp,
    drawerPress,
    searchPress,
    navigation,
    labelIcon,
    onBackPress,
  } = props;

  return (
    <>
      {headerLogin === true ? (
        <View style={styles.txtTitle}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="arrowleft"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={onBackPress}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            <Text style={{ color: Theme.primary }}>.</Text>
          </View>
        </View>
      ) : headerThreeComp === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="indent-right"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={drawerPress}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            <FontAwesome5
              name="search-plus"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={searchPress}
            />
          </View>
        </View>
      ) : labelIcon === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="arrowleft"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={onBackPress}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            <Text style={{ color: Theme.primary }}>.</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
export default Audioheader;
