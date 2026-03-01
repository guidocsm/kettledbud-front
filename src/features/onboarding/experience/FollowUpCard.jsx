import { StyleSheet, TouchableOpacity } from 'react-native'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

export function FollowUpCard({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={onPress}
    >
      <CustomText
        fontWeight={600}
        fontSize={18}
        color={selected ? colors.dark : colors.white}
      >
        {label}
      </CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.main,
  },
  buttonSelected: {
    backgroundColor: colors.main,
  },
})