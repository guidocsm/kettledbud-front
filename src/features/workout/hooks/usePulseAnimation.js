import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

const PULSE_THRESHOLD = 10

export function usePulseAnimation(timeRemaining) {
  const opacity = useRef(new Animated.Value(1)).current
  const animationRef = useRef(null)

  const shouldPulse = timeRemaining > 0 && timeRemaining <= PULSE_THRESHOLD

  useEffect(() => {
    if (shouldPulse) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      )
      animationRef.current = pulse
      pulse.start()
    } else {
      if (animationRef.current) {
        animationRef.current.stop()
        animationRef.current = null
      }
      opacity.setValue(1)
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [shouldPulse])

  return opacity
}
