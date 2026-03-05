import { usePathname } from 'expo-router'
import { StyleSheet, View , Image } from 'react-native'

import { BackButton } from '@/src/components/BackButton'
import CustomText from '@/src/components/CustomText'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { OnboardingProgressBar } from '@/src/features/onboarding/components/OnboardingProgressBar'
import { STEP_CONFIG, TOTAL_STEPS } from '@/src/features/onboarding/utils/constants'

export function OnboardingHeader() {
  const pathname = usePathname()
  const { onboardingState } = useOnboarding()

  const slug = pathname?.replace(/^\/onboarding\/?/, '').split('/')[0] || ''
  const currentStepIndex = STEP_CONFIG.findIndex(step => step.slug === slug)
  const currentStep = STEP_CONFIG[currentStepIndex] ?? STEP_CONFIG[0]
  const wasFilled = onboardingState?.hasOwnProperty(slug) && onboardingState[slug]

  return (
    <View style={styles.header}>
      <BackButton />
      <OnboardingProgressBar
        currentStepIndex={currentStepIndex}
        totalSteps={TOTAL_STEPS}
      />
      <View style={styles.mascotSpeechContainer}>
        <Image
          source={require('@/assets/images/kettlebud-logo.png')}
          style={styles.mascot}
          resizeMode="contain"
          width={80}
          height={80}
        />
        <TypewriterBubble
          arrowDirection="left"
          animated={!wasFilled}
        >
          <CustomText
            fontSize={16}
            fontWeight={600}
            color={colors.dark}
          >
            {currentStep.speech}
          </CustomText>
        </TypewriterBubble>
      </View>
      <View style={styles.splitter} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    gap: 30,
    paddingHorizontal: 0,
  },
  mascotSpeechContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  mascot: {
    width: 30,
    height: 30,
  },
  splitter: {
    height: 1,
    backgroundColor: colors.mainLight,
  },
})
