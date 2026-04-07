import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { BackIcon, ClockIcon, GoalIcon } from '@/assets/Icons'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'
import { postWorkoutStart } from '@/src/services/workout/workoutStart'
import useWorkoutStore from '@/src/stores/useWorkoutStore'

import ExerciseCard from './components/ExerciseCard'
import ProgressBar from './components/ProgressBar'
import RestStepper from './components/RestStepper'
import { useGetPreworkout } from './hooks/useGetPreworkout'
import { WORKOUT_STATUS } from './utils/constants'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function PreworkoutScreen() {
  const [sessionExercises, setSessionExercises] = useState(null)
  const [starting, setStarting] = useState(false)

  const { sessionId } = useLocalSearchParams()
  const { t } = useTranslation()
  const router = useRouter()

  const { preworkout, loading } = useGetPreworkout(sessionId)

  const workoutStore = useWorkoutStore()

  useEffect(() => {
    if (preworkout) {
      workoutStore.initWorkout(preworkout)
    }
  }, [preworkout])

  const isInProgress = workoutStore.status === WORKOUT_STATUS.IN_PROGRESS
  const completedExerciseCount = workoutStore.exercises.filter(
    (e) => e.status === WORKOUT_STATUS.COMPLETED,
  ).length
  const totalExercises = workoutStore.exercises.length
  const isWorkoutCompleted = totalExercises > 0 && completedExerciseCount === totalExercises

  const muscleGroupLabel = preworkout?.muscleGroup
    ? t(`HOME.MUSCLE_GROUPS.${preworkout.muscleGroup}`)
    : ''

  const startWorkout = useCallback(async () => {
    try {
      setStarting(true)
      const data = await postWorkoutStart(sessionId, workoutStore.restTime ?? 90)
      setSessionExercises(data.sessionExercises)
      workoutStore.updateSessionStatus(WORKOUT_STATUS.IN_PROGRESS)
      return data
    } catch (err) {
      console.log('Error starting workout:', err)
      return null
    } finally {
      setStarting(false)
    }
  }, [sessionId, workoutStore.restTime, workoutStore.updateSessionStatus])

  const navigateToExercise = useCallback((exerciseId) => {
    router.push({
      pathname: ROUTES_NAMES.EXERCISE_ACTIVE,
      params: { sessionId, exerciseId },
    })
  }, [router, sessionId])

  const handleStartPress = useCallback(async () => {
    if (isWorkoutCompleted) {
      router.push(ROUTES_NAMES.HOME)
      return
    }

    if (isInProgress) {
      const nextExercise = workoutStore.exercises.find(
        (e) => e.status !== WORKOUT_STATUS.COMPLETED,
      )
      if (nextExercise) navigateToExercise(nextExercise.exerciseId)
      return
    }

    const data = await startWorkout()
    if (data) {
      const nextExercise = workoutStore.exercises.find(
        (e) => e.status !== WORKOUT_STATUS.COMPLETED,
      )
      if (nextExercise) navigateToExercise(nextExercise.exerciseId)
    }
  }, [isWorkoutCompleted, isInProgress, workoutStore.exercises, startWorkout, navigateToExercise, router])

  const handleExercisePress = useCallback(async (exerciseId) => {
    if (isInProgress) {
      navigateToExercise(exerciseId)
      return
    }

    const data = await startWorkout()
    if (data) navigateToExercise(exerciseId)
  }, [isInProgress, startWorkout, navigateToExercise])

  if (loading || !preworkout) return null

  return (
    <View style={styles.screen}>
      <PageWrapper style={styles.container} isScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <BackIcon width={20} height={20} color={colors.main} />
          </TouchableOpacity>
          <CustomText
            text={preworkout.routineName}
            fontWeight={700}
            fontSize={22}
            color={colors.white}
          />
        </View>
        <View style={styles.subtitle}>
          <GoalIcon width={20} height={20} color={colors.whiteLight} />
          <CustomText
            text={muscleGroupLabel}
            fontWeight={500}
            fontSize={16}
            color={colors.whiteLight}
          />
          <CustomText
            text=" | "
            fontWeight={400}
            fontSize={16}
            color={colors.whiteLight}
          />
          <ClockIcon width={20} height={20} color={colors.whiteLight} />
          <CustomText
            text={`${preworkout.estimatedDuration} ${t('CONSTANTS.MINUTES')}`}
            fontWeight={500}
            fontSize={16}
            color={colors.whiteLight}
          />
        </View>
        <ProgressBar progress={workoutStore.workoutProgress()} />
        <RestStepper value={workoutStore.restTime ?? 90} onChange={workoutStore.updateRestTime} />
        <View style={styles.exercisesContainer}>
          <View style={styles.exercisesHeader}>
            <CustomText
              text={t('PREWORKOUT.EXERCISES')}
              fontWeight={500}
              fontSize={18}
              color={colors.white}
            />
            <CustomText
              text={`${completedExerciseCount}/${totalExercises}`}
              fontWeight={600}
              fontSize={16}
              color={colors.whiteLight}
            />
          </View>
          <View style={styles.exerciseList}>
            {workoutStore.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.exerciseId}
                name={exercise.name}
                image={exercise.image}
                sets={exercise.sets}
                status={exercise.status}
                onPress={() => handleExercisePress(exercise.exerciseId)}
              />
            ))}
          </View>
        </View>
        <Button
          text={
            isWorkoutCompleted
              ? t('COMMON.CLOSE')
              : isInProgress
              ? t('PREWORKOUT.CONTINUE_ROUTINE')
              : t('PREWORKOUT.START_ROUTINE')
          }
          type={starting ? BUTTON_TYPES.DISABLED : BUTTON_TYPES.MAIN}
          onPress={handleStartPress}
        />
      </PageWrapper>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
  container: {
    paddingTop: 60,
    // paddingHorizontal: 20,
    gap: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -12,
  },
  exercisesContainer: {
    gap: 20,
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseList: {
    gap: 20,
  },
})
