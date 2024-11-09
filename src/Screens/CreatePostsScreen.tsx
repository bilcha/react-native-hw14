import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import GeoLocation from "../components/GeoLocation";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import Button from "../components/Button";
import { colors } from "../../styles/global";

interface GeoLocation {
  latitude: number;
  longitude: number;
}

export default function CreatePostsScreen() {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState("");
  const [geocode, setGeocode] = useState({});
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [type, setType] = useState<CameraType>("back");
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isSubmitActive, setSubmitActive] = useState(false);

  useEffect(() => {
    setSubmitActive(!!photo && !!location && !!title);
  }, [photo, location, title]);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.getPermissionsAsync();

      if (
        cameraPermission.status !== "granted" ||
        mediaLibraryPermission.status !== "granted"
      ) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        const { status: mediaStatus } =
          await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === "granted" && mediaStatus === "granted");
      } else {
        setHasPermission(true);
      }
    })();
  }, []);

  if (hasPermission) {
    return <Text>No access to camera</Text>;
  }

  const makePhoto = async () => {
    if (cameraRef) {
      const photoData = await cameraRef.takePictureAsync();
      setPhoto(photoData.uri);
    }
  };

  const cleanUp = () => {
    setPhoto("");
    setTitle("");
    setLocation("");
    setGeocode({});
  };

  const createPayload = async () => {
    const payloadData = {
      photo: photo,
      title,
      location: {
        geo: geocode,
        name: location,
      },
      createdAt: new Date().getTime(),
    };
    console.log(`payloadData`);
    cleanUp();
    navigation.navigate("PostsScreen");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    }
  };

  return (
    <ScrollView>
      <GeoLocation setLocation={setLocation} setGeocode={setGeocode} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {photo ? (
            <ImageBackground
              source={{ uri: photo }}
              style={styles.postPhotoWrap}
            >
              <TouchableOpacity
                style={{ ...styles.cameraBtn }}
                onPress={() => setPhoto("")}
              >
                <Ionicons name="camera" size={24} color={colors.white} />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <Camera style={styles.postPhotoWrap} type={type} ref={setCameraRef}>
              <MaterialCommunityIcons
                name="camera-flip"
                size={22}
                color={colors.darkGrey}
                style={styles.flipContainer}
                onPress={() =>
                  setType((current) => (current === "back" ? "front" : "back"))
                }
              />
              <TouchableOpacity style={styles.cameraBtn} onPress={makePhoto}>
                <Ionicons name="camera" size={24} color={colors.darkGrey} />
              </TouchableOpacity>
            </Camera>
          )}

          <Text style={styles.textWrap}>
            <Text style={styles.text} onPress={pickImage}>
              {photo ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              placeholder="Назва..."
              placeholderTextColor={colors.darkGrey}
              style={
                isFocused === "title"
                  ? { ...styles.input, borderColor: colors.accentOrange }
                  : styles.input
              }
              value={title}
              onChangeText={setTitle}
              onFocus={() => setIsFocused("title")}
              onBlur={() => setIsFocused(null)}
            />
            <View>
              <Feather
                name="map-pin"
                size={24}
                color={colors.darkGrey}
                style={styles.locationIcon}
              />
              <TextInput
                placeholder="Місцевість..."
                placeholderTextColor={colors.darkGrey}
                style={
                  isFocused === "location"
                    ? {
                        ...styles.input,
                        marginBottom: 32,
                        paddingLeft: 28,
                        borderColor: colors.accentOrange,
                      }
                    : { ...styles.input, marginBottom: 32, paddingLeft: 28 }
                }
                value={location}
                onChangeText={setLocation}
                onFocus={() => setIsFocused("location")}
                onBlur={() => setIsFocused(null)}
              />
            </View>
          </KeyboardAvoidingView>
          <Button
            onPress={createPayload}
            outerStyles={[styles.mainText, isSubmitActive && styles.activeBtn]}
          >
            <Text>Опублікувати</Text>
          </Button>
          <TouchableOpacity
            style={styles.trashBtn}
            onPress={cleanUp}
            disabled={!photo && !title && !location}
          >
            <Feather name="trash-2" size={24} color={colors.darkGrey} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 5,
    backgroundColor: colors.white,
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: "rgba(0, 0, 0, 0.30)",
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
  },
  postPhotoWrap: {
    marginTop: 32,
    flex: 1,
    height: 250,
    overflow: "hidden",
    backgroundColor: colors.inputBackground,
    borderColor: colors.border,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrap: {
    paddingTop: 8,
    marginBottom: 32,
  },
  text: {
    fontSize: 16,
    fontFamily: "RobotoRegular",
    color: colors.darkGrey,
  },
  input: {
    height: 50,
    width: "100%",
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingBottom: 11,
    borderColor: colors.border,
    color: colors.darkText,
    fontSize: 16,
  },
  flipContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  locationIcon: {
    position: "absolute",
    top: 10,
    left: 0,
  },
  btnText: {
    color: colors.darkGrey,
    textAlign: "center",
  },
  mainText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeBtn: {
    backgroundColor: colors.accentOrange,
    color: colors.white,
  },
  trashBtn: {
    width: 70,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 23,
    paddingVertical: 8,
    marginTop: 130,
    marginBottom: 45,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
