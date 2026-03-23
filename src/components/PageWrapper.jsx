// src/components/ScrollScreen.tsx
import { colors } from '@/src/constants/theme'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function PageWrapper({
  children,
  style,
  isScrollView = false,
  onScroll,
  scrollEventThrottle,
}) {
  const { bottom } = useSafeAreaInsets()

  if (isScrollView) {
    return (
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.scrollContentStyle,
          { paddingBottom: bottom },
          style,
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
      >
        {children}
      </ScrollView>
    )
  }

  return (
    <View style={[styles.container, { marginBottom: bottom }, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  scrollContentStyle: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
})
