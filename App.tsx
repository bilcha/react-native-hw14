import "react-native-gesture-handler";

import { ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./navigation/HomeScreen";
import MapScreen from "./Screens/MapScreen";
import ComentsScreen from "./Screens/ComentsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{
            presentation: "modal",
            title: "Мапа",
          }}
        />
        <MainStack.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{
            title: "Створити публікацію",
            presentation: "modal",
          }}
        />
        <MainStack.Screen
          name="Coments"
          component={ComentsScreen}
          options={{
            title: "Коментарі",
            presentation: "modal",
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
