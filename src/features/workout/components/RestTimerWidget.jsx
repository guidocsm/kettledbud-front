import { useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ChevronIcon, ClockIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import useRestTimerStore from '@/src/stores/useRestTimerStore'
import useWorkoutStore from '@/src/stores/useWorkoutStore'

import { usePulseAnimation } from '../hooks/usePulseAnimation'
import { WORKOUT_STATUS } from '../utils/constants'
import { formatTime } from '@/src/constants/formatTime'

const TAB_BAR_HEIGHT = 90

export default function RestTimerWidget() {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const segments = useSegments()
  const router = useRouter()

  const restTimerStore = useRestTimerStore()
  const workoutStore = useWorkoutStore()
  const pulseOpacity = usePulseAnimation(restTimerStore.timeRemaining)
  const flashOverlayOpacity = pulseOpacity.interpolate({
    inputRange: [0.3, 1],
    outputRange: [0.35, 0],
  })

  const isTabScreen = segments[0] === '(tabs)'
  const isExerciseActiveScreen = segments[segments.length - 1] === 'exerciseActive'
  const bottomOffset = isTabScreen ? TAB_BAR_HEIGHT + 30 : (insets.bottom || 16)

  const exercise = workoutStore.exercises.find(
    (e) => e.exerciseId === workoutStore.currentExerciseId,
  )
  const isExerciseCompleted = exercise?.status === WORKOUT_STATUS.COMPLETED

  useEffect(() => {
    if (restTimerStore.isFinished && isExerciseActiveScreen) {
      restTimerStore.dismissFinished()
    }
  }, [restTimerStore.isFinished, isExerciseActiveScreen])

  const shouldShow = (restTimerStore.isActive || restTimerStore.isFinished) && !restTimerStore.isVisible
  if (!shouldShow) return null

  const handleFinishedPress = () => {
    restTimerStore.dismissFinished()

    if (isExerciseCompleted) {
      router.replace({
        pathname: ROUTES_NAMES.PREWORKOUT,
        params: { sessionId: workoutStore.sessionId },
      })
    } else {
      router.replace({
        pathname: ROUTES_NAMES.EXERCISE_ACTIVE,
        params: {
          sessionId: workoutStore.sessionId,
          exerciseId: workoutStore.currentExerciseId,
        },
      })
    }
  }

  if (restTimerStore.isFinished) {
    return (
      <View style={[styles.wrapper, { bottom: bottomOffset }]}>
        <TouchableOpacity
          style={styles.bar}
          activeOpacity={0.85}
          onPress={handleFinishedPress}
        >
          <View style={styles.content}>
            <View style={styles.left}>
              <Mascot style={styles.mascot} />
              <CustomText
                text={t(isExerciseCompleted ? 'REST.READY_NEXT_EXERCISE' : 'REST.READY_NEXT_SET')}
                fontWeight={700}
                fontSize={16}
                color={colors.white}
                extraStyle={styles.messageText}
              />
            </View>
            <View style={styles.rightIcon}>
              <ChevronIcon width={28} height={28} color={colors.main} direction="right" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={[styles.wrapper, { bottom: bottomOffset }]}>
      <TouchableOpacity
        style={styles.bar}
        activeOpacity={0.85}
        onPress={restTimerStore.expandTimer}
      >
        <View style={styles.content}>
          <View style={styles.left}>
            <View style={styles.clockIcon}>
              <ClockIcon width={24} height={24} color={colors.main} />
            </View>
            <CustomText
              text={formatTime(restTimerStore.timeRemaining)}
              fontWeight={700}
              fontSize={24}
              color={colors.white}
            />
          </View>
          <View style={styles.rightIcon}>
            <ChevronIcon width={28} height={28} color={colors.main} direction="right" />
          </View>
        </View>
        <Animated.View 
          pointerEvents="none" 
          style={[styles.flashOverlay, { opacity: flashOverlayOpacity }]} 
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 50,
  },
  clockIcon: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: colors.mainLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grayDark,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.main,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    zIndex: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  rightIcon: {
    width: 28,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -1 }],
  },
  mascot: {
    width: 67,
    height: 46,
  },
  messageText: {
    maxWidth: 190,
    flexShrink: 1,
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.main,
    borderRadius: 50,
    zIndex: 1,
  },
})
