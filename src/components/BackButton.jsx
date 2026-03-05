import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { BackIcon } from '../../assets/Icons'
import { colors } from '../constants/theme'

import CustomText from './CustomText'

export function BackButton({ style }) {
  const router = useRouter()

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => router.back()}
      activeOpacity={0.7}
    >
      <BackIcon width={22} height={22} color={colors.main} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
})
