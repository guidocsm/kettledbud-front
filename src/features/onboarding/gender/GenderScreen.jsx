import { useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'

import { MaleIcon, FemaleIcon, LineIcon } from '@/assets/Icons'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { GENDER_STEP } from '../utils/constants'

export default function GenderScreen() {
  const router = useRouter()
  const { onboardingConfig, onboardingState, setOnboardingState } = useOnboarding()

  const handlePress = (option) => {
    setOnboardingState((prev) => ({ ...prev, gender: option.value }))
    router.push(ROUTES_NAMES.BIRTH_DATE)
  }

  const genderOptions = onboardingConfig?.genderOptions?.map((option) => ({
    ...option,
    icon: GENDER_STEP.ICONS[option.value] ?? LineIcon,
  })) ?? []

  if (!genderOptions.length) {
    return null
  }

  return (
    <View style={styles.container}>
      {genderOptions.map((option, index) => {
        const IconComponent = option.icon
        const isSelected = onboardingState?.gender === option.value
        return (
          <OnboardingCard
            key={option.value ?? index}
            icon={<IconComponent color={isSelected ? colors.dark : colors.main} />}
            label={option.label}
            onPress={() => handlePress(option)}
            selectedCard={isSelected}
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
