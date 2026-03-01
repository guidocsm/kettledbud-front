import { View, StyleSheet } from 'react-native'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { FollowUpCard } from '@/src/features/onboarding/experience/FollowUpCard'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { ONBOARDING } from '@/src/features/onboarding/utils/constants'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { useRouter } from 'expo-router'

export default function ExperienceScreen() {
  const router = useRouter()
  const { onboardingState, setOnboardingState } = useOnboarding()

  const selectedSlug = onboardingState?.experienceSelection ?? null
  const followUpAnswer = onboardingState?.experienceFollowUp ?? null
  const selectedOption = ONBOARDING.EXPERIENCE.find(o => o.slug === selectedSlug)

  const handlePress = (option) => {
    setOnboardingState(prev => ({
      ...prev,
      experienceSelection: option.slug,
      experienceFollowUp: null,
      experience: option?.followUp ? undefined : option.slug,
    }))

    if (!option?.followUp) {
      router.push('/onboarding/workoutPerWeek')
    }
  }

  const handleFollowUp = (moreThanSixMonths) => {
    setOnboardingState(prev => ({
      ...prev,
      experienceFollowUp: moreThanSixMonths,
      experience: moreThanSixMonths ? 'experienced' : 'new'
    }))

    router.push('/onboarding/workoutPerWeek')
  }

  return (
    <View style={styles.container}>
      {ONBOARDING.EXPERIENCE.map((option, index) => (
        <OnboardingCard
          key={index}
          icon={<option.icon color={selectedSlug === option.slug ? colors.dark : colors.main} />}
          title={option.title}
          description={option.description}
          onPress={() => handlePress(option)}
          selectedCard={selectedSlug === option.slug}
        />
      ))}
      {selectedOption?.followUp && (
        <View style={styles.followUp}>
          <CustomText fontWeight={600} fontSize={16} color={colors.white}>
            {selectedOption.followUp}
          </CustomText>
          <View style={styles.buttonRow}>
            <FollowUpCard
              label="Sí"
              selected={followUpAnswer === true}
              onPress={() => handleFollowUp(true)}
            />
            <FollowUpCard
              label="No"
              selected={followUpAnswer === false}
              onPress={() => handleFollowUp(false)}
            />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  followUp: {
    gap: 16,
    paddingTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
})
