import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/global";

const PostItem = () => {
  const navigation = useNavigation();
  const [userPutLike, setUserPutLike] = useState(false);
  const handleLikes = () => {
    setUserPutLike((prev) => !prev);
  };
  return (
    <View style={styles.postContainer}>
      <View style={styles.postPhotoWrap}>
        <Image
          source={require("../assets/images/forest.png")}
          style={styles.postPhoto}
        />
        <TouchableOpacity style={styles.trashBtn} onPress={() => {}}>
          <Feather name="trash-2" size={20} color={"#9e9d9d"} />
        </TouchableOpacity>
      </View>
      <Text style={styles.postTitle}>Ліс</Text>
      <View style={styles.postDetails}>
        <TouchableOpacity
          style={styles.postData}
          onPress={() => navigation.navigate("Coments")}
        >
          <Feather
            name={"message-circle"}
            size={24}
            color={colors.accentOrange}
          />
          <Text style={styles.title}>8</Text>
        </TouchableOpacity>
        <View style={{ ...styles.postData, marginLeft: 24 }}>
          <Feather
            name="thumbs-up"
            size={24}
            color={!userPutLike ? colors.darkGrey : colors.accentOrange}
            onPress={handleLikes}
          />
          <Text style={styles.title}>153</Text>
        </View>
        <View style={styles.postLocation}>
          <Feather name="map-pin" size={24} color={colors.darkGrey} />
          <Text
            style={styles.locationText}
            onPress={() => navigation.navigate("Map")}
          >
            Ukraine
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 15,
  },
  postPhotoWrap: {
    width: "100%",
    height: 240,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
  },
  postPhoto: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  trashBtn: {
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  postTitle: {
    marginTop: 8,
    fontFamily: "RobotoBold",
    color: colors.darkText,
    fontSize: 16,
  },
  postDetails: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  postData: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
  postLocation: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  title: {
    fontFamily: "RobotoRegular",
    color: colors.darkText,
    fontSize: 16,
  },
  locationText: {
    fontFamily: "RobotoRegular",
    color: colors.darkText,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
