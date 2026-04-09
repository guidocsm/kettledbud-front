import { Video, ResizeMode } from 'expo-av'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import { DumbbellIcon, PauseIcon, PlayIcon } from '@/assets/Icons'
import AlertModal from '@/src/components/AlertModal'
import { BackButton } from '@/src/components/BackButton'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import Loading from '@/src/components/Loading'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'
import { useElapsedTime } from '@/src/hooks/useElapsedTime'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { patchExerciseComplete } from '@/src/services/workout/patchExerciseComplete'
import { patchWorkoutSet } from '@/src/services/workout/patchWorkoutSet'
import useRestTimerStore from '@/src/stores/useRestTimerStore'
import useWorkoutStore from '@/src/stores/useWorkoutStore'

import ExerciseTips from './components/ExerciseTips'
import ProgressBar from './components/ProgressBar'
import SetsTable from './components/SetsTable'
import { useGetExerciseDetail } from './hooks/useGetExerciseDetail'
import { WORKOUT_STATUS } from './utils/constants'

export default function ExerciseActiveScreen() {
  const { sessionId, exerciseId } = useLocalSearchParams()
  const { t } = useTranslation()
  const router = useRouter()
  const elapsedTime = useElapsedTime()

  const { exerciseDetail, loading } = useGetExerciseDetail(sessionId, exerciseId)
  const [localSets, setLocalSets] = useState([])
  const [savingSetIndex, setSavingSetIndex] = useState(-1)
  const [savingExerciseComplete, setSavingExerciseComplete] = useState(false)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)

  const workoutStore = useWorkoutStore()
  const restTimerStore = useRestTimerStore()

  useEffect(() => {
    if (exerciseId) {
      workoutStore.setCurrentExerciseId(parseInt(exerciseId))
    }
  }, [exerciseId])

  useEffect(() => {
    if (exerciseDetail?.sets) {
      setLocalSets(
        exerciseDetail.sets.map((s) => ({
          ...s,
          weight: s.weight != null ? String(s.weight) : '',
          reps: s.actualReps != null ? String(s.actualReps) : '',
        })),
      )
    }
  }, [exerciseDetail])

  const activeSetIndex = useMemo(() => {
    if (exerciseDetail?.status === WORKOUT_STATUS.COMPLETED) return -1
    return localSets.findIndex((s) => !s.isCompleted)
  },
    [localSets, exerciseDetail?.status],
  )
  const currentExerciseStatus = useMemo(
    () => workoutStore.exercises.find((e) => e.exerciseId === parseInt(exerciseId))?.status,
    [workoutStore.exercises, exerciseId],
  )
  const hasOtherExerciseInProgress = useMemo(
    () => workoutStore.exercises.some(
      (e) => e.exerciseId !== parseInt(exerciseId) && e.status === WORKOUT_STATUS.IN_PROGRESS,
    ),
    [workoutStore.exercises, exerciseId],
  )

  const hasCompletedAtLeastOneSet = useMemo(() => localSets.some((s) => s.isCompleted), [localSets])
  const hasPendingSets = useMemo(() => localSets.some((s) => !s.isCompleted), [localSets])
  const isExerciseCompleted = useMemo(() => currentExerciseStatus === WORKOUT_STATUS.COMPLETED, [currentExerciseStatus])
  const isSetEntryLocked = useMemo(() => currentExerciseStatus === WORKOUT_STATUS.PENDING && hasOtherExerciseInProgress, [currentExerciseStatus, hasOtherExerciseInProgress])

  const handleSetChange = useCallback((index, field, value) => {
    setLocalSets((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    )
  }, [])

  const handleSetComplete = useCallback(async (index, weight, reps) => {
    if (isSetEntryLocked) return

    const weightNum = parseFloat(weight)
    const repsNum = parseInt(reps, 10)

    if (!weightNum || weightNum <= 0 || !repsNum || repsNum <= 0) return

    const set = localSets[index]
    if (!set) return

    try {
      setSavingSetIndex(index)
      const result = await patchWorkoutSet(set.exerciseSetId, weightNum, repsNum)
      const nextSets = localSets.map((s, i) =>
          i === index ? { ...s, isCompleted: true, weight, reps } : s,
      )
      setLocalSets(nextSets)
      workoutStore.incrementCompletedSets()
      restTimerStore.startTimer(workoutStore.restTime ?? 90)

      if (result.exerciseCompleted || nextSets.every((s) => s.isCompleted)) {
        workoutStore.updateExerciseStatus(parseInt(exerciseId), WORKOUT_STATUS.COMPLETED)

        if (result?.sessionCompleted) {
          router.replace('/')
          return
        }
      } else {
        workoutStore.updateExerciseStatus(parseInt(exerciseId), WORKOUT_STATUS.IN_PROGRESS)
      }
    } catch (err) {
      console.log('Error saving set:', err)
    } finally {
      setSavingSetIndex(-1)
    }
  }, [localSets, isSetEntryLocked])

  const togglePlayback = useCallback(async () => {
    if (!videoRef.current) return
    if (isPlaying) {
      await videoRef.current.pauseAsync()
    } else {
      await videoRef.current.playAsync()
    }
    setIsPlaying((prev) => !prev)
  }, [isPlaying])

  const completeExercise = useCallback(async () => {
    if (!exerciseDetail?.sessionExerciseId) return

    try {
      setSavingExerciseComplete(true)
      const result = await patchExerciseComplete(exerciseDetail.sessionExerciseId)
      workoutStore.updateExerciseStatus(parseInt(exerciseId), WORKOUT_STATUS.COMPLETED)

      if (result?.sessionCompleted) {
        router.replace('/')
        return
      }

      router.replace({
        pathname: ROUTES_NAMES.PREWORKOUT,
        params: { sessionId },
      })
    } catch (err) {
      console.log('Error completing exercise:', err)
    } finally {
      setSavingExerciseComplete(false)
    }
  }, [router, sessionId, exerciseId, exerciseDetail?.sessionExerciseId])

  const handleCompleteExercise = useCallback(async () => {
    if (hasPendingSets) {
      setIsConfirmModalVisible(true)
      return
    }

    await completeExercise()
  }, [hasPendingSets, completeExercise])

  const handleConfirmCompleteExercise = useCallback(async () => {
    setIsConfirmModalVisible(false)
    await completeExercise()
  }, [completeExercise])

  const workoutProgress = useMemo(
    () => workoutStore.workoutProgress(),
    [workoutStore.completedSets, workoutStore.totalSets],
  )
  const preworkoutRoute = useMemo(
    () => (sessionId ? `${ROUTES_NAMES.PREWORKOUT}?sessionId=${sessionId}` : ROUTES_NAMES.PREWORKOUT),
    [sessionId],
  )

  if (loading || !exerciseDetail) return <Loading />
  
  return (
    <View style={styles.screen}>
      <PageWrapper style={styles.container} isScrollView>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <BackButton route={preworkoutRoute} />
            <CustomText
              text={t('EXERCISE_ACTIVE.BACK_TO_HUB')}
              fontWeight={500}
              fontSize={18}
              color={colors.white}
            />
          </View>
          {elapsedTime ? (
            <CustomText
              text={elapsedTime}
              fontWeight={600}
              fontSize={18}
              color={colors.main}
            />
          ) : null}
        </View>
        <ProgressBar progress={workoutProgress} />
        <View style={styles.exerciseNameRow}>
          <CustomText
            text={exerciseDetail.name}
            fontWeight={600}
            fontSize={20}
            color={colors.white}
            extraStyle={styles.exerciseName}
          />
          {exerciseDetail?.muscleGroup ? (
            <CustomText
              text={exerciseDetail?.muscleGroup}
              fontWeight={500}
              fontSize={16}
              color={colors.main}
            />
          ) : null}
        </View>
        {exerciseDetail.videoUrl ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={togglePlayback}
            style={styles.videoWrapper}
          >
            <Video
              ref={videoRef}
              source={{ uri: exerciseDetail.videoUrl }}
              style={styles.exerciseVideo}
              resizeMode={ResizeMode.COVER}
              shouldPlay
              isLooping
              isMuted
            />
            <TouchableOpacity
              onPress={togglePlayback}
              style={styles.playPauseButton}
              activeOpacity={0.7}
            >
              {isPlaying ? (
                <PauseIcon width={20} height={20} color={colors.white} />
              ) : (
                <PlayIcon width={20} height={20} color={colors.white} />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        ) : exerciseDetail.image ? (
          <Image
            source={{ uri: exerciseDetail.image }}
            style={styles.exerciseImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <DumbbellIcon width={40} height={40} color={colors.whiteLight} />
          </View>
        )}
        <ExerciseTips tips={exerciseDetail.tips} />
        <View style={styles.setsTableContainer}>
          <SetsTable
            sets={localSets}
            activeSetIndex={isSetEntryLocked ? -1 : activeSetIndex}
            savingSetIndex={savingSetIndex}
            onSetComplete={handleSetComplete}
            onSetChange={handleSetChange}
          />
        </View>
        {!isExerciseCompleted && (
          <Button
            text={t('EXERCISE_ACTIVE.COMPLETE_EXERCISE')}
            type={
              hasCompletedAtLeastOneSet && !savingExerciseComplete
                ? BUTTON_TYPES.MAIN
                : BUTTON_TYPES.DISABLED
            }
            onPress={handleCompleteExercise}
          />
        )}
      </PageWrapper>
      <AlertModal
        visible={isConfirmModalVisible}
        description={t('EXERCISE_ACTIVE.CONFIRM_COMPLETE_DESCRIPTION')}
        primaryButtonText={t('EXERCISE_ACTIVE.COMPLETE_EXERCISE')}
        onPrimaryPress={handleConfirmCompleteExercise}
        onSecondaryPress={() => setIsConfirmModalVisible(false)}
        onClose={() => setIsConfirmModalVisible(false)}
      />
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
    gap: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exerciseNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    flex: 1,
    marginRight: 12,
  },
  videoWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#252525',
  },
  exerciseVideo: {
    width: '100%',
    height: '100%',
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#252525',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setsTableContainer: {
    gap: 15,
  },
})
