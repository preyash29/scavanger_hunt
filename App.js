import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
const RootStack = createNativeStackNavigator();
//! Navigator Screens
import Navigation from "./src/Screens/Navigations/StackNavigation";
import Theme from "./src/Utils/Theme";
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.primary,
  },
};
function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer options>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <RootStack.Screen name="Navigation" component={Navigation} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
