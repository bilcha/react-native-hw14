import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import MapScreen from "../Screens/MapScreen";
import ComentsScreen from "../Screens/ComentsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator();

export default function MainNavigation() {
  return (
    // <NavigationContainer>
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
    // </NavigationContainer>
  );
}
