import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { colors } from '@/src/constants/theme'
import { ONBOARDING } from '@/src/features/onboarding/utils/constants'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { useRouter } from 'expo-router'

export default function ExperienceScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { onboardingState, setOnboardingState } = useOnboarding()

  const handlePress = (slug) => {
    setOnboardingState(prev => ({ ...prev, experience: slug }))
    router.push('/onboarding/workoutPerWeek')
  }

  return (
    <View style={styles.container}>
      {ONBOARDING.EXPERIENCE.map((option, index) => {
        return (
          <OnboardingCard
            key={index}
            icon={<option.icon color={onboardingState?.experience === option.slug ? colors.dark : colors.main} />}
            title={option.title}
            description={option.description}
            onPress={() => handlePress(option.slug)}
            selectedCard={onboardingState?.experience === option.slug}
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
