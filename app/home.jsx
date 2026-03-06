import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { View } from 'react-native'

export default function home() {
  return (
    <View>
      <CustomText color={colors.white} text="Home" />
    </View>
  )
}
