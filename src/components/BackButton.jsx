import { StyleSheet, TouchableOpacity } from 'react-native'

import { BackIcon } from '@/assets/Icons'
import { colors } from '@/src/constants/theme'
import { useBackButton } from '@/src/hooks/useBackButton'

export function BackButton({ route = '' }) {
  const { handleBackPress } = useBackButton(route)

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleBackPress}
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
