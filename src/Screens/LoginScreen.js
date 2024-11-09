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
import { colors } from "../../styles/global";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginDB } from "../redux/reducers/authOperation";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthError } from "../redux/reducers/authSelector";
import Toast from "react-native-toast-message";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    if (email && password) {
      dispatch(
        loginDB({
          inputEmail: email,
          inputPassword: password,
        })
      ).then((response) => {
        if (response.type === "auth/login/fulfilled") {
          Toast.show({
            type: "success",
            text1: `${email}`,
            text2: "You are successfully log in",
          });
          reset();
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } else {
          return Toast.show({
            type: "error",
            text1: "Oops! Something went wrong.",
            text2: `${errorMessage}`,
          });
        }
      });
    }
  };
  const showPassword = () => {
    setIsSecure((prev) => !prev);
  };
  const passwordShow = (
    <TouchableOpacity onPress={showPassword}>
      <Text style={styles.inputBtn}>Показати</Text>
    </TouchableOpacity>
  );

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
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputContainer}>
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
              <Button onPress={handleLogin} outerStyles={styles.buttonCTA}>
                <Text style={[styles.btnText, styles.mainText]}>Увійти</Text>
              </Button>
              <Text style={[styles.mainText, styles.toLoginBtn]}>
                Немає акаунту?
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={[styles.mainText, styles.btnLink]}>
                    Зареєструватися
                  </Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

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
    height: "55%",
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    color: colors.darkText,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    textAlign: "center",
    marginVertical: 32,
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
