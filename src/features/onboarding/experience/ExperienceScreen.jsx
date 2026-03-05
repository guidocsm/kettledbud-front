import { useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { FollowUpCard } from '@/src/features/onboarding/experience/FollowUpCard'
import { EXPERIENCE_STEP } from '@/src/features/onboarding/utils/constants'
import { useTranslation } from 'react-i18next'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function ExperienceScreen() {
  const { onboardingConfig, onboardingState, setOnboardingState } = useOnboarding()

  const router = useRouter()
  const { t } = useTranslation()

  const handlePress = (value) => {
    const hasFollowUp = value !== EXPERIENCE_STEP.KEYS.NEW

    setOnboardingState((prev) => ({
      ...prev,
      experienceSelection: value,
      experienceFollowUp: null,
      experience: hasFollowUp ? undefined : value,
    }))

    if (!hasFollowUp) {
      router.push(ROUTES_NAMES.DAYS_PER_WEEK)
    }
  }

  const handleFollowUp = (moreThanSixMonths) => {
    setOnboardingState((prev) => ({
      ...prev,
      experienceFollowUp: moreThanSixMonths,
      experience: moreThanSixMonths ? EXPERIENCE_STEP.KEYS.RETURNING : EXPERIENCE_STEP.KEYS.NEW,
    }))

    router.push(ROUTES_NAMES.DAYS_PER_WEEK)
  }

  const experienceOptions = onboardingConfig?.experienceLevels?.map(level => ({
    ...level,
    icon: EXPERIENCE_STEP.ICONS[level.value],
  })) ?? []
  const experienceValue = onboardingState?.experienceSelection ?? null
  const followUpAnswer = onboardingState?.experienceFollowUp ?? null
  const hasFollowUp = experienceValue && experienceValue !== EXPERIENCE_STEP.KEYS.NEW


  if (!experienceOptions.length) {
    return null
  }

  return (
    <View style={styles.container}>
      {experienceOptions.map((option, index) => {
        const IconComponent = option.icon
        
        return (
          <OnboardingCard
            key={option.value}
            label={option.label}
            description={option.description}
            onPress={() => handlePress(option.value)}
            selectedCard={experienceValue === option.value}
            icon={
              <IconComponent
                color={experienceValue === option.value ? colors.dark : colors.main}
              />
            }
          />
        )
      })}
      {hasFollowUp && (
        <View style={styles.followUp}>
          <CustomText 
            fontWeight={600} 
            fontSize={16} 
            color={colors.white}
          >
            {t('ONBOARDING.EXPERIENCE.FOLLOW_UP.MESSAGE')}
          </CustomText>
          <View style={styles.buttonRow}>
            <FollowUpCard
              label={t('ONBOARDING.EXPERIENCE.FOLLOW_UP.YES')}
              selected={followUpAnswer === true}
              onPress={() => handleFollowUp(followUpAnswer)}
            />
            <FollowUpCard
              label={t('ONBOARDING.EXPERIENCE.FOLLOW_UP.NO')}
              selected={followUpAnswer === false}
              onPress={() => handleFollowUp(followUpAnswer)}
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
