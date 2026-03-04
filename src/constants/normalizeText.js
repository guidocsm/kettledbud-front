import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const scale = SCREEN_WIDTH / 375 // 375px iPhone 11 base

export const normalizeText = (size) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale))
}