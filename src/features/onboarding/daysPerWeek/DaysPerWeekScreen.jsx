import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'

import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { DaysPerWeekCard } from './DaysPerWeekCard'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function DaysPerWeekScreen() {
  const { onboardingConfig, onboardingState, setOnboardingState } = useOnboarding()
  
  const { t } = useTranslation()
  const router = useRouter()

  const handlePress = (value) => {
    setOnboardingState((prev) => ({ ...prev, daysPerWeek: value }))
  }
  
  const daysPerWeekOptions = onboardingConfig?.daysPerWeek ?? []
  const selectedDay = daysPerWeekOptions.find(option => option.value === onboardingState?.daysPerWeek) || null 

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.cardsContainer}>
          {daysPerWeekOptions.map((option, index) => (
            <DaysPerWeekCard
              key={option.value ?? index}
              value={option.value}
              onPress={() => handlePress(option.value)}
              selectedCard={onboardingState?.daysPerWeek === option.value}
            />
          ))}
        </View>
        <CustomText
          text={t('COMMON.DAYS_PER_WEEK')}
          fontWeight={400}
          fontSize={16}
          color={colors.whiteLight}
        />
      </View>
      {selectedDay && (
      <CustomText
        text={selectedDay.description || ''}
        fontWeight={700}
        fontSize={16}
        color={colors.main}
        extraStyle={styles.selectedCardFeedback}
      />
      )}
      <Button
        text={t('COMMON.GO')}
        type={onboardingState?.daysPerWeek != null ? BUTTON_TYPES.MAIN : BUTTON_TYPES.DISABLED}
        onPress={() => router.push(ROUTES_NAMES.TIME_PER_SESSION)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  contentContainer: {
    alignItems: 'center',
    gap: 10,
  },
  selectedCardFeedback: {
    // borderColor: colors.main,
    // borderWidth: 1,
    // borderRadius: 20,
    // paddingVertical: 15,
    // paddingHorizontal: 20,
  },
})
