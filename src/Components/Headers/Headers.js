import React from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import Theme from "../../Utils/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./Style";

const Headers = (props) => {
  const {
    headerLogin,
    label,
    headerThreeComp,
    drawerPress,
    searchPress,
    onPress,
    labelIcon,
    city,
    cityName,
    headerFourComp,
    navigation,
  } = props;
  // alert(JSON.stringify(props, 0, 2));
  return (
    <>
      {Platform.OS === "ios" ? (
        <StatusBar barStyle="light-content" />
      ) : (
        <StatusBar barStyle="light-content" backgroundColor={Theme.primary} />
      )}
      {headerLogin === true ? (
        <View style={styles.headerWrap}>
          <Text style={styles.txtLabel}>{label}</Text>
        </View>
      ) : headerThreeComp === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Entypo
                name="menu"
                color={Theme.white}
                size={Theme.iconSize}
                // onPress={() =>
                //   navigation.dispatch(DrawerActions.toggleDrawer())
                // }
              />
            </TouchableOpacity>
            <Text style={styles.txtLabel}>{label}</Text>
            <TouchableOpacity onPress={searchPress}>
              <Entypo name="plus" color={Theme.white} size={Theme.iconSize} />
            </TouchableOpacity>
          </View>
        </View>
      ) : headerFourComp === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="left"
              color={Theme.white}
              size={Theme.iconSizeSm}
              onPress={() => navigation.replace("DrawerNavigation")}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            {/* <FontAwesome5
              name="search-plus"
              color={Theme.white}
              size={Theme.iconSize}
            /> */}
            <TouchableOpacity onPress={searchPress}>
              <Text
                style={{
                  fontSize: Theme.txtMedium,
                  color: Theme.white,
                  fontWeight: "bold",
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : labelIcon === true ? (
        <View style={styles.headerWrap}>
          <View style={styles.flexJustify}>
            <AntDesign
              name="arrowleft"
              color={Theme.white}
              size={Theme.iconSize}
              onPress={onPress}
            />
            <Text style={styles.txtLabel}>{label}</Text>
            <Text style={{ color: Theme.primary }}>.</Text>
          </View>
        </View>
      ) : city === true ? (
        <View style={styles.headerWrap1}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: Theme.wp("90%"),
              paddingHorizontal: Theme.wp("3%"),
            }}
          >
            <Image
              source={require("../../Assets/mapPin.png")}
              resizeMode="contain"
              style={{ width: Theme.wp("5%"), height: Theme.hp("2.5%") }}
            />
            <Text style={styles.cityText}>{cityName}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "DrawerNavigation" }],
              });
              // navigation.replace("DrawerNavigation");
            }}
          >
            <Text
              style={{
                // marginTop: 5,
                fontSize: 15,
                color: Theme.black,
                fontWeight: "bold",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
export default Headers;
