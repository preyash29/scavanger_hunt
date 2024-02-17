import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "../../Constants/GoogleMapKey";
import { db, auth } from "../../Utils/Exports";
import Theme from "../../Utils/Theme";

const AddressPickup = ({ placheholderText, fetchAddress }) => {
  const [xyz, setXyz] = useState("");

  const onPressAddress = async (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const cityVal = details.formatted_address;
    const cityVal1 = details.formatted_address;
    // await AsyncStorage.setItem('cityVal', cityVal);
    // await AsyncStorage.setItem('cityVal1', cityVal1);
    fetchAddress(lat, lng, cityVal);

    // console.log(cityVal);
    // streetAdress();

    let resLength = details.address_components;
    let zipCode = "";
    let filtersResCity = details.address_components.filter((val) => {
      if (val.types.includes("locality") || val.types.includes("sublocality")) {
        return val;
      }
      if (val.types.includes("postal_code")) {
        let postalCode = val.long_name;
        zipCode = postalCode;
      }
      return false;
    });

    let dataTextCityObj =
      filtersResCity.length > 0
        ? filtersResCity[0]
        : details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
          ];

    const cityText =
      dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
        ? dataTextCityObj.short_name
        : dataTextCityObj.long_name;
    setXyz(cityVal);

    // console.log("zip cod found", zipCode)
    // console.log('city namte', inputCity);

    // console.warn('CityVal:', xyz);

    // fetchAddress(lat, lng, zipCode, cityText);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placheholderText}
        onPress={onPressAddress}
        fetchDetails={true}
        query={{
          key: GOOGLE_MAP_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
          separator: styles.separator,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: { backgroundColor: "transparent" },
  textInputStyle: {
    height: 50,
    color: "black",
    fontSize: 16,
    // backgroundColor: 'black',
    backgroundColor: "#66B5EB",
    borderRadius: 7,
  },
  textInput: {
    height: 48,
    color: "black",
    fontSize: 16,
    backgroundColor: "#8EC2E2",
    // marginLeft: 5,
  },

  separator: {
    backgroundColor: "grey",
    height: 1,
  },
  listView: {
    position: "absolute",
    top: 105,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 10,
  },
});

export default AddressPickup;
