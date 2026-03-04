import { View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'

export default function SummaryScreen() {
  const { onboardingState } = useOnboarding()
  console.log('onboardingState', onboardingState);
  return (
    <View>
      <CustomText color={colors.white}>{JSON.stringify(onboardingState)}</CustomText>
    </View>
  )
}
