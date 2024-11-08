import { StyleSheet, Image, View } from "react-native";
import { colors } from "../styles/global";

export default function ComentsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.postPhotoWrap}>
        <Image
          source={require("../assets/images/forest.png")}
          style={styles.postPhoto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
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
});
