import { useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'

import { ThunderIcon, BurnIcon, ClockIcon } from '@/assets/Icons'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { TIME_PER_WORKOUT_STEP } from '../utils/constants'

export default function TimePerSessionScreen() {
  const { onboardingConfig, onboardingState, setOnboardingState } = useOnboarding()
  
  const router = useRouter()

  const handlePress = (option) => {
    setOnboardingState((prev) => ({ ...prev, timePerSession: option.value }))
    router.push(ROUTES_NAMES.BRIDGE)
  }

  const timePerSessionOptions = onboardingConfig?.timePerSession?.map((option, index) => ({
    ...option,
    icon: TIME_PER_WORKOUT_STEP.ICONS[option.value] ?? ClockIcon,
  })) ?? []

  if (!timePerSessionOptions.length) {
    return null
  }

  return (
    <View style={styles.container}>
      {timePerSessionOptions.map((option, index) => {
        const IconComponent = option.icon

        return (
          <OnboardingCard
            key={option.value}
            icon={<IconComponent color={onboardingState?.timePerSession === option.value ? colors.dark : colors.main} />}
            label={option.label}
            description={option.description}
            onPress={() => handlePress(option)}
            selectedCard={onboardingState?.timePerSession === option.value}
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
