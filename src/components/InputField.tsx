import { StyleSheet, TextInput, View, ViewProps } from "react-native";
import { colors } from "../../styles/global";
import { FC, ReactNode, useState } from "react";

type InputProps = {
  value: string;
  placeholder?: string;
  outerStyles?: ViewProps["style"];
  rightButton?: ReactNode;
  autoFocus?: Boolean;
  onValueChange: (value: string) => void;
  secureTextEntry?: boolean;
};

const Input: FC<InputProps> = ({
  value,
  placeholder,
  outerStyles,
  rightButton,
  autoFocus = false,
  onValueChange,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={[styles.input, isFocused && styles.focused, outerStyles]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onChangeText={onValueChange}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {rightButton}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    padding: 16,
  },
  focused: {
    borderColor: colors.accentOrange,
    backgroundColor: colors.white,
  },
});

export default Input;
