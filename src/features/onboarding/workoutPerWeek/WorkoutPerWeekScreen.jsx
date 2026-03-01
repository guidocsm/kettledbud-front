import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { colors } from '@/src/constants/theme'
import { ONBOARDING } from '@/src/features/onboarding/utils/constants'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { useRouter } from 'expo-router'
import { WorkoutPerWeekCard } from './WorkoutPerWeekCard'
import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'

export default function WorkoutPerWeekScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { onboardingState, setOnboardingState } = useOnboarding()

  const handlePress = (value) => {
    setOnboardingState(prev => ({ ...prev, workoutPerWeek: value }))
  }

  const selectedCardDescription = ONBOARDING.WORKOUT_PER_WEEK.find(option => option.value === onboardingState.workoutPerWeek)?.description

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.cardsContainer}>
          {ONBOARDING.WORKOUT_PER_WEEK.map((option, index) => {
            return (
              <WorkoutPerWeekCard
                key={index}
                value={option.value}
                onPress={() => handlePress(option.value)}
                selectedCard={onboardingState.workoutPerWeek === option.value}
              />
            )
          })}
        </View>
        <CustomText
          text={t('COMMON.DAYS_PER_WEEK')}
          fontWeight={400}
          fontSize={16}
          color={colors.whiteLight}
        />
      </View>
      <CustomText
        text={selectedCardDescription}
        fontWeight={700}
        fontSize={16}
        color={colors.main}
        extraStyle={styles.selectedCardFeedback}
      />
      <Button
        text={t('COMMON.GO')}
        type={onboardingState.hasOwnProperty('workoutPerWeek') ? 'main' : 'disabled'}
        onPress={() => router.push('/onboarding/timePerWorkout')}
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
