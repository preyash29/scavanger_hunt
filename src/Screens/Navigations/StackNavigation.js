import React, { Component } from "react";
import { View, StatusBar, SafeAreaView, LogBox, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Theme from "../../Utils/Theme";
//Screens Imported
import SplashScreen from "../Splash/Splash";
import LoginScreen from "../LoginScreen/LoginScreen";
import SignupScreen from "../LoginScreen/SignupScreen";
import HomePage from "../HomePage/HomePage";
import AddPlace from "../AddPlace/AddPlace";
import AddQuiz from "../AddQuiz/AddQuiz";
import Profile from "../Profile/Profile";
import TermAndCondtion from "../TermAndCondtion/TermAndCondtion";
import Support from "../Support/Support";
import YourTrip from "../YourTrip/YourTrip";
import userChoosePlace from "../userChoosePlace/userChoosePlace";
import Check from "../Check";
import UserSideMap from "../UserSideMap/UserSideMap";
import UserSideMap2 from "../UserSideMap/UserSideMap2";

import DrawerNavigation from "./DrawerNavigation";
import chooseSide from "../chooseSide/chooseSide";

import SoundRecordingHome from "../HomePage/SoundRecordHome";
import Recording from "../HomePage/SoundRecord/Recording/Recording";
import Library from "../Library/Library";
import CreatorPhotoUpload from "../HomePage/CreatorPhotoUpload/CreatorPhotoUpload";
import UserDoQuiz from "../UserDoQuiz/UserDoQuiz";
import Enterquiz from "../EnterQuizes/Enterquiz";
import QuizModel from "../../Components/QuizModel/QuizModel";
import HomePage2 from "../HomePage/HomePage2";
import RecordingScreen from "../RecordingScreen/RecordingScreen";
import CorrectAnswerScreen from "../CorrectAnswerScreen/CorrectAnswerScreen";
import LiveTracking from "../UserSideMap/LiveTracking";
import HomePageFL from "../../Components/FlatLists/userSideFlatList/HomePageFL";

const Stack = createNativeStackNavigator();
class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    // LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);
    LogBox.ignoreLogs([
      "MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS",
      '[TypeError: undefined is not an object (evaluating json.results[5].formatted_address")]',
    ]);
  }

  render() {
    LogBox.ignoreAllLogs();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          {Platform.OS === "ios" ? (
            <StatusBar barStyle="dark-content" />
          ) : (
            <StatusBar
              barStyle="light-content"
              backgroundColor={Theme.primary}
            />
          )}
        </View>

        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="chooseSide" component={chooseSide} />
          <Stack.Screen name="userChoosePlace" component={userChoosePlace} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="HomePage2" component={HomePage2} />
          <Stack.Screen name="UserSideMap" component={UserSideMap} />
          <Stack.Screen name="UserSideMap2" component={UserSideMap2} />
          {/* //! DrawerNavigation */}
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          <Stack.Screen name="AddPlace" component={AddPlace} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="TermAndCondtion" component={TermAndCondtion} />
          <Stack.Screen name="Support" component={Support} />

          <Stack.Screen name="UserDoQuiz" component={UserDoQuiz} />
          <Stack.Screen name="Check" component={Check} />
          <Stack.Screen name="AddQuiz" component={AddQuiz} />
          <Stack.Screen name="YourTrip" component={YourTrip} />
          <Stack.Screen name="SoundHome" component={SoundRecordingHome} />
          <Stack.Screen name="Recording" component={Recording} />
          <Stack.Screen name="Library" component={Library} />
          <Stack.Screen
            name="CorrectAnswerScreen"
            component={CorrectAnswerScreen}
          />
          <Stack.Screen name="enterquiz" component={Enterquiz} />
          <Stack.Screen name="RecordingScreen" component={RecordingScreen} />
          <Stack.Screen name="quizmodel" component={QuizModel} />
          <Stack.Screen name="HomePageFL" component={HomePageFL} />

          <Stack.Screen
            name="CreatorPhotoUpload"
            component={CreatorPhotoUpload}
          />
          <Stack.Screen name="LiveTracking" component={LiveTracking} />
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}

export default Navigation;
