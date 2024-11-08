import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../styles/global";
import ProfileScreen from "../Screens/ProfileScreen";
import HomeIcon from "../icons/homeIcon";
import LogoutIcon from "../icons/logoutIcon";
import PostsScreen from "../Screens/PostsScreen";
import { useNavigation } from "@react-navigation/native";
import CreatePostsScreen from "../Screens/CreatePostsScreen";

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <Tab.Navigator
      initialRouteName="Publication"
      screenOptions={({ route }) => ({
        headerRightContainerStyle: { paddingRight: 16 },
        headerLeftContainerStyle: { paddingLeft: 16 },
        headerTitleAlign: "center",
        headerTitleStyle: styles.headerTabStyle,
        tabBarStyle: [
          styles.tabBarStyle,
          route.name === "CreatePosts" && { display: "none" },
        ],
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
      })}
    >
      <Tab.Screen
        name="Publication"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => <LogoutIcon onPress={handleLogout} />,
          tabBarIcon: ({ focused, color, size = 24 }) => (
            <View
              style={[styles.iconContainer, focused && styles.activeBackground]}
            >
              <HomeIcon />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              color={"#212121"}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
          tabBarIcon: ({ focused, color, size = 24 }) => (
            <View
              style={[styles.iconContainer, focused && styles.activeBackground]}
            >
              <Feather name="plus" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size = 24 }) => (
            <View
              style={[styles.iconContainer, focused && styles.activeBackground]}
            >
              <Feather name="user" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingTop: 10,
    paddingBottom: 34,
    height: 84,
    paddingHorizontal: 82,
  },
  headerTabStyle: {
    fontWeight: "500",
    fontSize: 17,
    letterSpacing: -0.4,
    color: colors.darkText,
    lineHeight: 22,
  },
  title: {
    fontWeight: 500,
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: "center",
    color: colors.blueText,
  },
  iconContainer: {
    width: 70,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeBackground: {
    backgroundColor: colors.accentOrange,
  },
});
