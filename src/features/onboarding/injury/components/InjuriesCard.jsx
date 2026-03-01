import { StyleSheet, TouchableOpacity, View } from 'react-native'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

export function InjuriesCard({ injury = '', selected = false, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.injurySelected]}
      onPress={onPress}
    >
      <CustomText
        text={injury}
        fontSize={16}
        color={selected ? colors.dark : colors.white}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.main,
  },
  injurySelected: {
    backgroundColor: colors.main,
  },
})