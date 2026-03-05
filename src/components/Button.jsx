import { StyleSheet, TouchableOpacity } from 'react-native'

import { colors } from '../constants/theme'

import CustomText from './CustomText'

export const BUTTON_TYPES = {
  MAIN: 'main',
  OUTLINE: 'outline',
  DISABLED: 'disabled',
}

export function Button({
  type = BUTTON_TYPES.MAIN,
  textColor = colors.dark,
  text = '',
  style = {},
  disabled = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], style]}
      onPress={onPress}
      disabled={type === BUTTON_TYPES.DISABLED}
    >
      <CustomText
        text={text}
        color={type === BUTTON_TYPES.DISABLED ? `${textColor}80` : textColor}
        fontWeight={700}
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
  disabled: {
    backgroundColor: `${colors.main}80`,
  },
})