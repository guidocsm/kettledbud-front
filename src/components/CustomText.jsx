import React from 'react'
import { Text } from 'react-native'

import { getFontFamily } from '../constants/getFontFamily'
import { normalizeText } from '../constants/normalizeText'
import { colors, fontBody } from '../constants/theme'

const CustomText = ({
  text,
  children,
  fontFamily = fontBody,
  fontWeight = 400,
  color = colors.dark,
  fontSize = 16,
  textTransform = 'none',
  extraStyle = {},
  textAlign = 'left',
  lineHeight = null,
}) => {
  const style = {
    fontFamily: getFontFamily(fontFamily, fontWeight),
    color,
    fontSize: normalizeText(fontSize),
    textTransform,
    textAlign,
    ...(lineHeight != null && { lineHeight }),
    ...extraStyle,
  }

  return <Text style={style}>{children ?? text ?? ''}</Text>
}

export default CustomText
