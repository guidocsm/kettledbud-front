import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { colors } from '@/src/constants/theme'

const CURRENT_WIDTH = 45
const STEP_WIDTH = 12
const HEIGHT = 12
const ANIMATION_DURATION = 300

function Step({ state }) {
  const width = useRef(new Animated.Value(state === 'current' ? CURRENT_WIDTH : STEP_WIDTH)).current
  const bgColor = useRef(new Animated.Value(state === 'rest' ? 0 : 1)).current

  useEffect(() => {
    const toWidth = state === 'current' ? CURRENT_WIDTH : STEP_WIDTH
    const toColor = state === 'rest' ? 0 : 1

    Animated.parallel([
      Animated.spring(width, {
        toValue: toWidth,
        useNativeDriver: false,
        tension: 120,
        friction: 14,
      }),
      Animated.timing(bgColor, {
        toValue: toColor,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start()
  }, [state])

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.main],
  })

  return (
    <Animated.View
      style={[styles.step, { width, backgroundColor }]}
    />
  )
}

export function OnboardingProgressBar({ currentStepIndex = 0, totalSteps = 8 }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const state =
          i === currentStepIndex ? 'current'
          : i < currentStepIndex ? 'completed'
          : 'rest'

        return <Step key={i} state={state} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  step: {
    height: HEIGHT,
    borderRadius: 6,
  },
})
