import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, ActivityIndicator } from "react-native";
import styles from "./Style";
import Header from "../../Components/Headers/Headers";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import HomePageFL from "../../Components/FlatLists/userSideFlatList/HomePageFL";
import { db, auth } from "../../Utils/Exports";
import Theme from "../../Utils/Theme";
const userChoosePlace = (props) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [HomePageData, setHomePageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // {
  //   CreatedBy: "Created By :",
  //   TutorName: "",
  //   // Street: 'Azadi-Chownk',
  //   TutorTrainHour: "2h",
  //   Time: "05:00 pm",
  //   TutorCity: "Islamabad",
  // },
  // const getPlaces = () => {
  //   try {
  //     setIsLoading(true);
  //     const currentUid = auth.currentUser.uid;
  //     const ref = db.ref("Users/" + currentUid).child("Posts");
  //     const list = [];
  //     ref.on("value", (snapshot) => {
  //       if (snapshot.exists()) {
  //         const Posts = snapshot.val();
  //         /////////////////////////////////////////////////////////////////
  //         // METHOD 1:
  //         const { "Custom-Coords": Custom_Coords, ...remainigData } = Posts;
  //         Object.keys(remainigData).forEach((item) => {
  //           list.push(remainigData[item]);
  //         });
  //       }

  //       // METHOD 2:
  //       // delete allPosts.Posts["Custom-Coords"];
  //       // Object.keys(allPosts.Posts).forEach((item) => {
  //       //   list.push(allPosts.Posts[item]);
  //       // });
  //       /////////////////////////////////////////////////////////////////
  //       setHomePageData(list);
  //       setMasterDataSource(list);
  //       setIsLoading(false);
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  useEffect(() => {
    getPlaces();
  }, []);

  const getPlaces = () => {
    try {
      setIsLoading(true); // Start loading indicator
      const currentUid = auth.currentUser.uid;
      const ref = db.ref("Users/" + currentUid).child("Posts");
      const list = [];
      ref.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const Posts = snapshot.val();
          const { "Custom-Coords": Custom_Coords, ...remainingData } = Posts;
          Object.keys(remainingData).forEach((item) => {
            list.push(remainingData[item]);
          });
          console.log("Fetched data:", list); // Log fetched data
          setHomePageData(list);
          setMasterDataSource(list);
        }
        setIsLoading(false); // Stop loading indicator
      }, (error) => {
        setIsLoading(false); // Stop loading indicator in case of error
        console.error("Error fetching data:", error);
      });
    } catch (error) {
      setIsLoading(false); // Stop loading indicator in case of error
      console.error("Error fetching data:", error);
    }
  };
  
   
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.City ? item.City.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setHomePageData(newData);
      setSearchQuery(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setHomePageData(masterDataSource);
      setSearchQuery(text);
    }
  };

  return (
    <View style={styles.MainView}>
      <Header
        label={"Choose Place"}
        labelIcon={true}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.searchInputContainer}>
        <TextInput
          placeholder="Search Place by City"
          style={styles.searchTxtInp}
          maxLength={30}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="gray"
          value={searchQuery}
          clearButtonMode="always"
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
        />
        <Icon
          name="search-location"
          size={Theme.RFPercentage(2.5)}
          color={"gray"}
        />
      </View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Theme.primary} />
        </View>
      ) : (
        <HomePageFL data={HomePageData} navigation={navigation} />
      )}
    </View>
  );
};

export default userChoosePlace;
