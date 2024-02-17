import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Support from "../Support/Support";

import YourTrip from "../YourTrip/YourTrip";
import TermAndCondtion from "../TermAndCondtion/TermAndCondtion";
import { DrawerContent } from "../../Components/DrawerContent/DrawerContent";
import HomePage2 from "../HomePage/HomePage2";
import StackNavigation from "./StackNavigation";
import AddPlace from "../AddPlace/AddPlace";
const Drawer = createDrawerNavigator();

export default function DrawerNavigation(props) {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage2"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="HomePage2" component={HomePage2} />
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Drawer.Screen name="AddPlace" component={AddPlace} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="YourTrip" component={YourTrip} />
      <Drawer.Screen name="TermAndCondtion" component={TermAndCondtion} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Stack" component={StackNavigation} />
    </Drawer.Navigator>
  );
}
