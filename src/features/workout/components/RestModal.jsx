import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Animated, Easing, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Circle } from 'react-native-svg'

import { BackIcon } from '@/assets/Icons'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import useRestTimerStore from '@/src/stores/useRestTimerStore'
import useWorkoutStore from '@/src/stores/useWorkoutStore'

import ProgressBar from './ProgressBar'
import { usePulseAnimation } from '../hooks/usePulseAnimation'
import { WORKOUT_STATUS } from '../utils/constants'
import { formatTime } from '@/src/constants/formatTime'

const TIMER_SIZE = 380
const TIMER_STROKE_WIDTH = 18
const TIMER_RADIUS = (TIMER_SIZE / 2) - TIMER_STROKE_WIDTH
const CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function RestModal() {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const restTimerStore = useRestTimerStore()
  const workoutStore = useWorkoutStore()

  const [message, setMessage] = useState('')
  const animatedOffset = useRef(new Animated.Value(0)).current
  const pulseOpacity = usePulseAnimation(restTimerStore.timeRemaining)

  useEffect(() => {
    if (restTimerStore.isVisible) {
      const messages = t('REST.MESSAGES', { returnObjects: true })
      setMessage(messages[Math.floor(Math.random() * messages.length)])
      animatedOffset.setValue(0)
    }
  }, [restTimerStore.isVisible])

  useEffect(() => {
    if (!restTimerStore.isVisible || restTimerStore.totalTime === 0) return

    const targetOffset = CIRCUMFERENCE * (1 - restTimerStore.timeRemaining / restTimerStore.totalTime)

    if (restTimerStore.timeRemaining >= restTimerStore.totalTime) {
      animatedOffset.setValue(0)
      return
    }

    Animated.timing(animatedOffset, {
      toValue: targetOffset,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
  }, [restTimerStore.timeRemaining, restTimerStore.isVisible])

  const navigateAfterRest = useCallback(() => {
    if (workoutStore.workoutSummary) return

    const exercise = workoutStore.exercises.find(
      (e) => e.exerciseId === workoutStore.currentExerciseId,
    )
    const isExerciseCompleted = exercise?.status === WORKOUT_STATUS.COMPLETED

    if (isExerciseCompleted) {
      router.replace({
        pathname: ROUTES_NAMES.PREWORKOUT,
        params: { sessionId: workoutStore.sessionId },
      })
      return
    }

    router.replace({
      pathname: ROUTES_NAMES.EXERCISE_ACTIVE,
      params: {
        sessionId: workoutStore.sessionId,
        exerciseId: String(workoutStore.currentExerciseId),
      },
    })
  }, [
    router,
    workoutStore.workoutSummary,
    workoutStore.exercises,
    workoutStore.currentExerciseId,
    workoutStore.sessionId,
  ])

  useEffect(() => {
    if (!restTimerStore.isFinished || !restTimerStore.isVisible) return

    restTimerStore.dismissFinished()
    navigateAfterRest()
  }, [restTimerStore.isFinished, restTimerStore.isVisible, navigateAfterRest])

  const handleSkipRest = useCallback(() => {
    const exercise = workoutStore.exercises.find(
      (e) => e.exerciseId === workoutStore.currentExerciseId,
    )
    const isExerciseCompleted = exercise?.status === WORKOUT_STATUS.COMPLETED

    restTimerStore.skipTimer()

    if (workoutStore.workoutSummary) return

    if (isExerciseCompleted) {
      router.replace({
        pathname: ROUTES_NAMES.PREWORKOUT,
        params: { sessionId: workoutStore.sessionId },
      })
    }
  }, [
    router,
    workoutStore.workoutSummary,
    workoutStore.exercises,
    workoutStore.currentExerciseId,
    workoutStore.sessionId,
    restTimerStore,
  ])

  return (
    <Modal
      visible={restTimerStore.isVisible}
      transparent
      animationType="fade"
    >
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
          },
        ]}
      >
        <View style={styles.topSection}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.minimizeButton}
              onPress={restTimerStore.minimizeTimer}
            >
              <View style={styles.backIconWrapper}>
                <BackIcon width={20} height={20} color={colors.main} />
              </View>
              <CustomText
                text={t('REST.MINIMIZE')}
                fontWeight={500}
                fontSize={18}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
          <ProgressBar progress={workoutStore.workoutProgress()} />
          <View style={styles.mascotRow}>
            <Mascot style={styles.mascot} />
            <TypewriterBubble arrowDirection="left" width={240}>
              <CustomText fontWeight={500} fontSize={16} color={colors.dark}>
                {message}
              </CustomText>
            </TypewriterBubble>
          </View>
          <Animated.View style={[styles.timerContainer, { opacity: pulseOpacity }]}>
            <Svg width={TIMER_SIZE} height={TIMER_SIZE}>
              <Circle
                cx={TIMER_SIZE / 2}
                cy={TIMER_SIZE / 2}
                r={TIMER_RADIUS}
                stroke={colors.gray}
                strokeWidth={TIMER_STROKE_WIDTH}
                fill="none"
              />
              <AnimatedCircle
                cx={TIMER_SIZE / 2}
                cy={TIMER_SIZE / 2}
                r={TIMER_RADIUS}
                stroke={colors.main}
                strokeWidth={TIMER_STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={animatedOffset}
                strokeLinecap="round"
                rotation={-90}
                originX={TIMER_SIZE / 2}
                originY={TIMER_SIZE / 2}
              />
            </Svg>
            <View style={styles.timerContent}>
              <CustomText
                text={formatTime(restTimerStore.timeRemaining)}
                fontWeight={700}
                fontSize={70}
                color={colors.white}
              />
              <CustomText
                text={t('REST.TITLE')}
                fontWeight={400}
                fontSize={16}
                color={colors.whiteLight}
              />
            </View>
          </Animated.View>
        </View>
        <Button
          type={BUTTON_TYPES.OUTLINE}
          text={t('REST.SKIP')}
          textColor={colors.main}
          onPress={handleSkipRest}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
  topSection: {
    gap: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minimizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mascot: {
    width: 109,
    height: 75,
  },
  timerContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
})
