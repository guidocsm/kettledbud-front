import { Image } from 'react-native'

export default function Mascot({
  style,
  source = require('@/assets/images/kettlebud-logo.png'),
}) {
  return (
    <Image
      source={source}
      style={style}
      resizeMode="contain"
    />
  )
}
