import { StyleSheet, TouchableOpacity, View } from 'react-native'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

export function WorkoutPerWeekCard({ value, onPress, selectedCard }) {
  return (
    <TouchableOpacity
      style={[styles.card, selectedCard && styles.selectedCard]}
      onPress={onPress}
    >
      <CustomText
        fontWeight={selectedCard ? 700 : 600}
        fontSize={24}
        extraStyle={styles.title}
        color={selectedCard ? colors.dark : colors.white}
      >
        {value}
      </CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  selectedCard: {
    backgroundColor: colors.main,
  },
})