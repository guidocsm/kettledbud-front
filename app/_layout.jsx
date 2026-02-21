import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppFonts } from '@/src/hooks/useAppFonts'
import { colors } from '../src/constants/theme'

export default function RootLayout() {
  const { fontsLoaded, fontError } = useAppFonts()
  const insets = useSafeAreaInsets()

  if (!fontsLoaded && !fontError) return null

  return (
    <SafeAreaProvider style={styles.app}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: [
            styles.screenContent,
            {
              paddingTop: insets.top + 50,
              paddingBottom: insets.bottom + 50,
              paddingLeft: insets.left + 30,
              paddingRight: insets.right + 30,
            },
          ],
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="init" />
        <Stack.Screen name="welcome" />
      </Stack>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  screenContent: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
})
