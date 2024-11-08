import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles/global";
import LogoutIcon from "../icons/logoutIcon";
import CrossIcon from "../icons/crossIcon";
import { useNavigation } from "@react-navigation/native";
import PostItem from "../components/PostItem";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/photoBG.png")}
        resizeMode="cover"
        style={styles.bgImage}
      />
      <View style={styles.inner}>
        <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
          <LogoutIcon />
        </TouchableOpacity>
        <View style={styles.photoContainer}>
          <Image
            source={require("../assets/images/profilePhoto.png")}
            resizeMode="contain"
            style={styles.profilePhoto}
          />
          <TouchableOpacity style={styles.crossIcon}>
            <CrossIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Natali Romanova</Text>
        <PostItem />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-end",
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  inner: {
    height: "75%",
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
  },
  photoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    padding: 4,
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
  },
  logoutIcon: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  crossIcon: {
    position: "absolute",
    right: -6,
    top: 75,
  },
  title: {
    color: colors.darkText,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    textAlign: "center",
    marginBottom: 32,
  },
});
