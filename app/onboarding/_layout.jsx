import { Stack, usePathname } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { OnboardingProvider } from '@/src/contexts/OnboardingContext'
import { colors } from '@/src/constants/theme'
import { OnboardingHeader } from '@/src/features/onboarding/components/OnboardingHeader'

export default function OnboardingLayout() {
  const pathname = usePathname()

  return (
    <OnboardingProvider>
      <View style={styles.container}>
        {pathname !== '/onboarding/bridge' && <OnboardingHeader />}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: styles.screenContent,
          }}
        >
          <Stack.Screen name="goal" />
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
