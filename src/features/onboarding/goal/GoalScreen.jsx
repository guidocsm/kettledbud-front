import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { colors } from '@/src/constants/theme'
import { ONBOARDING } from '@/src/features/onboarding/utils/constants'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { useRouter } from 'expo-router'

export default function GoalScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { onboardingState, setOnboardingState } = useOnboarding()

  const handlePress = (slug) => {
    setOnboardingState(prev => ({ ...prev, goal: slug }))
    router.push('/onboarding/experience')
  }

  return (
    <View style={styles.container}>
      {ONBOARDING.GOAL.map((option, index) => {
        return (
          <OnboardingCard
            key={index}
            icon={<option.icon color={onboardingState?.goal === option.slug ? colors.dark : colors.main} />}
            title={option.title}
            description={option.description}
            onPress={() => handlePress(option.slug)}
            selectedCard={onboardingState.goal === option.slug}
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
