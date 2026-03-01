import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { colors } from '@/src/constants/theme'
import { ONBOARDING } from '@/src/features/onboarding/utils/constants'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { useRouter } from 'expo-router'

export default function GenderScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { onboardingState, setOnboardingState } = useOnboarding()

  const handlePress = (slug) => {
    setOnboardingState(prev => ({ ...prev, gender: slug }))
    router.push('/onboarding/birthday')
  }

  return (
    <View style={styles.container}>
      {ONBOARDING.GENDER.map((option, index) => {
        return (
          <OnboardingCard
            key={index}
            icon={<option.icon color={onboardingState?.gender === option.slug ? colors.dark : colors.main} />}
            title={option.title}
            onPress={() => handlePress(option.slug)}
            selectedCard={onboardingState.gender === option.slug}
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
