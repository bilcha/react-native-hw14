import "react-native-gesture-handler";

import { ActivityIndicator, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigation from "./src/navigation/MainNavigarion";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import { authStateChanged } from "./src/utils/Authantication";

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
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <Authentication />
      </PersistGate>
    </Provider>
  );
}
const Authentication = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authStateChanged(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};
