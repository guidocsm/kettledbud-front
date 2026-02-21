import { colors } from "../constants/theme"
import CustomText from "./CustomText"
import { StyleSheet, TouchableOpacity } from "react-native"

export function Button({
  type = 'main',
  textColor = colors.white,
  text = '',
  style = {},
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], style]}
      onPress={onPress}
    >
      <CustomText
        text={text}
        color={textColor}
        fontWeight={600}
        fontSize={16}
        textAlign="center"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    justifyContent: 'center',
    borderRadius: 50,
    width: '100%',
  },
  main: {
    backgroundColor: colors.main,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.main,
  },
})