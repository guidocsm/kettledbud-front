import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'

import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { GOALS_STEP } from '../utils/constants'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function GoalScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { onboardingConfig, onboardingState, setOnboardingState } = useOnboarding()

  const handlePress = (slug) => {
    setOnboardingState(prev => ({ ...prev, goal: slug }))
    router.push(ROUTES_NAMES.EXPERIENCE)
  }

  const goalsOptions = onboardingConfig?.goals?.map((goal) => ({
    ...goal,
    icon: GOALS_STEP.ICONS[goal.value],
  })) || []

  if (!goalsOptions.length) {
    return null
  }

  return (
    <View style={styles.container}>
      {goalsOptions?.map((option) => {
        return (
          <OnboardingCard
            key={option.value}
            icon={<option.icon color={onboardingState?.goal === option.value ? colors.dark : colors.main} />}
            label={option.label}
            description={option.description}
            onPress={() => handlePress(option.value)}
            selectedCard={onboardingState?.goal === option.value}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
})
