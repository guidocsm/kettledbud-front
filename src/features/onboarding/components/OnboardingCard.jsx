import { StyleSheet, TouchableOpacity, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

export function OnboardingCard({ icon, label, description, selectedCard, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, selectedCard && styles.selectedCard]}
      onPress={onPress}
    >
      <View style={[styles.iconSlot, selectedCard && styles.selectedIconSlot]}>{icon}</View>
      <View style={styles.textBlock}>
        <CustomText
          fontWeight={selectedCard ? 700 : 600}
          fontSize={18}
          extraStyle={styles.label}
          color={selectedCard ? colors.dark : colors.white}
        >
          {label}
        </CustomText>
        {description && (
          <CustomText
            fontWeight={400}
            fontSize={14}
            color={selectedCard ? colors.darkLight : colors.whiteLight}
          >
            {description}
          </CustomText>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.main,
    gap: 10,
    padding: 20,
  },
  iconSlot: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainLight,
    borderRadius: 100,
  },
  textBlock: {
    flex: 1,
    flexShrink: 1,
    gap: 10,
    justifyContent: 'center',
  },
  selectedCard: {
    backgroundColor: colors.main,
  },
  selectedIconSlot: {
    backgroundColor: `${colors.dark}33`,
  },
})