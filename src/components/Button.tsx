import { StyleSheet, Text, TouchableOpacity, ViewProps } from "react-native";
import { FC, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  outerStyles?: ViewProps["style"];
  onPress: () => void;
};

const Button: FC<ButtonProps> = ({ children, outerStyles, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, outerStyles]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
