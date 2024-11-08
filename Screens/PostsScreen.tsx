import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { colors } from "../styles/global";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../assets/images/profilePhoto.png")}
          resizeMode="contain"
          style={styles.profilePhoto}
        />
        <View style={styles.userData}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: colors.white,
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: "rgba(0, 0, 0, 0.30)",
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
    minHeight: Dimensions.get("window").height - 150,
  },
  userInfo: {
    flexDirection: "row",
    gap: 8,
    paddingBottom: 15,
  },
  profilePhoto: {
    width: 60,
    height: 60,
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
  },
  userData: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    fontFamily: "RobotoBold",
    color: colors.darkText,
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "RobotoRegular",
    color: colors.darkText,
    fontSize: 11,
  },
});
