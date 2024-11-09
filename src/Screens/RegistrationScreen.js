import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../styles/global";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { registerDB } from "../redux/reducers/authOperation";
import { selectAuthError } from "../redux/reducers/authSelector";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const errorMessage = useSelector(selectAuthError);

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const showPassword = () => {
    setIsSecure((prev) => !prev);
  };
  const handleRegistration = () => {
    console.log(
      `RegistrationData: name: ${name}, email: ${email}, password: ${password}`
    );
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const passwordShow = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={[styles.inputBtn, styles.mainText]}>Показати</Text>
    </TouchableOpacity>
  );
  const addProfilePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return Toast.show({
        type: "info",
        text1: "Ви відмовилися від доступ до ваших фотографій!",
      });
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };
  const register = () => {
    if (!profilePhoto) {
      return Toast.show({
        type: "info",
        text1: "Аватар є обовязковим",
      });
    }

    if (!email && !password && !name) {
      return Toast.show({
        type: "info",
        text1: "Всі поля повинни бути заповненні обовязково.",
      });
    }

    if (email && password && name && profilePhoto) {
      dispatch(
        registerDB({
          inputEmail: email,
          inputPassword: password,
          inputLogin: name,
          profilePhoto,
        })
      ).then((response) => {
        console.log("Response Type:", response.type);

        if (response.type === "auth/signup/fulfilled") {
          Toast.show({
            type: "success",
            text1: `${name}`,
            text2: "Yay! Congrats, you join us!",
          });
          navigation.navigate("Login");
          reset();
        } else {
          return Toast.show({
            type: "error",
            text1: "Oops! Something went wrong",
            text2: `${errorMessage}`,
          });
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/photoBG.png")}
        resizeMode="cover"
        style={styles.bgImage}
      />
      <KeyboardAvoidingView
        style={styles.formWrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.photoContainer}>
              <Image
                style={styles.profilePhoto}
                source={{ uri: profilePhoto }}
              />

              <TouchableOpacity
                onPress={addProfilePhoto}
                style={styles.addIcon}
              >
                <Image source={profilePhoto} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputContainer}>
              <InputField
                placeholder="Логін"
                value={name}
                onValueChange={handleNameChange}
              />
              <InputField
                placeholder="Адреса електронної пошти"
                value={email}
                onValueChange={handleEmailChange}
              />
              <InputField
                placeholder="Пароль"
                outerStyles={styles.passwordBtn}
                rightButton={passwordShow}
                value={password}
                onValueChange={handlePasswordChange}
                secureTextEntry={isSecure}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={handleRegistration}
                outerStyles={styles.buttonCTA}
              >
                <Text style={[styles.btnText, styles.mainText]}>
                  Зареєструватися
                </Text>
              </Button>
              <Text style={[styles.mainText, styles.toLoginBtn]}>
                Вже є акаунт?
                <TouchableWithoutFeedback onPress={register}>
                  <Text style={[styles.mainText, styles.btnLink]}>Увійти</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inner: {
    height: "65%",
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
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    position: "relative",
  },
  addIcon: {
    position: "absolute",
    left: 107,
    top: 80,
  },
  title: {
    color: colors.darkText,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
  },
  buttonContainer: {
    gap: 16,
    marginTop: 42,
  },
  passwordBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBtn: {
    color: colors.blueText,
  },
  mainText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },
  toLoginBtn: {
    flexDirection: "row",
    color: colors.blueText,
    textAlign: "center",
  },
  btnText: {
    color: colors.white,
  },
  buttonCTA: {
    backgroundColor: colors.accentOrange,
  },
  btnLink: {
    color: colors.blueText,
    textDecorationLine: "underline",
    marginLeft: 8,
  },
});
