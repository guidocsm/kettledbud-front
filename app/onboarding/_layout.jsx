import { Stack, usePathname } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { colors } from '@/src/constants/theme'
import { OnboardingProvider } from '@/src/contexts/OnboardingContext'
import { OnboardingHeader } from '@/src/features/onboarding/components/OnboardingHeader'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

const headlessRoutes = [ROUTES_NAMES.BRIDGE, ROUTES_NAMES.SUMMARY, ROUTES_NAMES.WELCOME, ROUTES_NAMES.PREPARING_PLAN]

export default function OnboardingLayout() {
  const pathname = usePathname()
  const showHeader = !headlessRoutes.includes(pathname)
  
  return (
    <OnboardingProvider>
      <View style={styles.container}>
        {showHeader && <OnboardingHeader />}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: styles.screenContent,
            animation: 'none'
          }}
        >
          <Stack.Screen name="welcome" />
          <Stack.Screen name="goal" />
          <Stack.Screen name="experience" />
          <Stack.Screen name="daysPerWeek" />
          <Stack.Screen name="timePerSession" />
          <Stack.Screen name="bridge" />
          <Stack.Screen name="gender" />
          <Stack.Screen name="birthDate" />
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
