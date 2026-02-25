import { Stack, usePathname } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { OnboardingProvider } from '@/src/contexts/OnboardingContext'
import { colors } from '@/src/constants/theme'
import { OnboardingHeader } from '@/src/features/onboarding/components/OnboardingHeader'

export default function OnboardingLayout() {
  const pathname = usePathname()

  const showHeader = pathname !== '/onboarding/bridge' && pathname !== '/onboarding/summary'

  return (
    <OnboardingProvider>
      <View style={styles.container}>
        {showHeader && <OnboardingHeader />}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: styles.screenContent,
            animation: "none"
          }}
        >
          <Stack.Screen name="goal" />
          <Stack.Screen name="experience" />
          <Stack.Screen name="workoutPerWeek" />
          <Stack.Screen name="timePerWorkout" />
          <Stack.Screen name="gender" />
          <Stack.Screen name="birthday" />
          <Stack.Screen name="bodyMetrics" />
          <Stack.Screen name="injuries" />
          <Stack.Screen name="summary" />
        </Stack>
      </View>
    </OnboardingProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
  screenContent: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  header: {
    justifyContent: 'space-between',
    gap: 30,
    paddingHorizontal: 0,
    paddingBottom: 16,
  }
})
