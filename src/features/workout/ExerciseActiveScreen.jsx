import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import { BackIcon, DumbbellIcon } from '@/assets/Icons'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { patchWorkoutSet } from '@/src/services/workout/patchWorkoutSet'

import ExerciseTips from './components/ExerciseTips'
import ProgressBar from './components/ProgressBar'
import SetsTable from './components/SetsTable'
import { useGetExerciseDetail } from './hooks/useGetExerciseDetail'

export default function ExerciseActiveScreen() {
  const { sessionId, exerciseId } = useLocalSearchParams()
  const { t } = useTranslation()
  const router = useRouter()

  const { exerciseDetail, loading } = useGetExerciseDetail(sessionId, exerciseId)
  const [localSets, setLocalSets] = useState([])
  const [savingSetIndex, setSavingSetIndex] = useState(-1)
  const [completedProgressCount, setCompletedProgressCount] = useState(0)
  const [exerciseIsCompleted, setExerciseIsCompleted] = useState(false)

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

  useEffect(() => {
    if (exerciseDetail?.workoutProgress) {
      setCompletedProgressCount(exerciseDetail.workoutProgress.completed)
    }
  }, [exerciseDetail?.workoutProgress])

  const activeSetIndex = useMemo(
    () => localSets.findIndex((s) => !s.isCompleted),
    [localSets],
  )

  const workoutProgress = exerciseDetail?.workoutProgress
  const overallProgress = workoutProgress
    ? completedProgressCount / workoutProgress.total
    : 0

  const handleSetChange = useCallback((index, field, value) => {
    setLocalSets((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    )
  }, [])

  const handleSetComplete = useCallback(async (index, weight, reps) => {
    const weightNum = parseFloat(weight)
    const repsNum = parseInt(reps, 10)

    if (!weightNum || weightNum <= 0 || !repsNum || repsNum <= 0) return

    const set = localSets[index]
    if (!set) return

    try {
      setSavingSetIndex(index)
      const result = await patchWorkoutSet(set.exerciseSetId, weightNum, repsNum)
      setLocalSets((prev) =>
        prev.map((s, i) =>
          i === index ? { ...s, isCompleted: true, weight, reps } : s,
        ),
      )
      setCompletedProgressCount((prev) => prev + 1)

      if (result.exerciseCompleted) {
        setExerciseIsCompleted(true)
      }
    } catch (err) {
      console.log('Error saving set:', err)
    } finally {
      setSavingSetIndex(-1)
    }
  }, [localSets])

  const handleCompleteExercise = useCallback(() => {
    router.push({
      pathname: ROUTES_NAMES.PREWORKOUT,
      params: { sessionId },
    })
  }, [router, sessionId, exerciseId])

  if (loading || !exerciseDetail) return null

  return (
    <View style={styles.screen}>
      <PageWrapper style={styles.container} isScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <BackIcon width={22} height={22} color={colors.main} />
          </TouchableOpacity>
          <CustomText
            text={t('EXERCISE_ACTIVE.BACK_TO_HUB')}
            fontWeight={500}
            fontSize={18}
            color={colors.white}
          />
        </View>
        <ProgressBar progress={overallProgress} />
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
        {exerciseDetail.image ? (
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
            activeSetIndex={activeSetIndex}
            savingSetIndex={savingSetIndex}
            onSetComplete={handleSetComplete}
            onSetChange={handleSetChange}
          />
          {!exerciseIsCompleted && (
            <CustomText
              text={t('EXERCISE_ACTIVE.FILL_ALL_DATA')}
              fontWeight={500}
              fontSize={12}
              color={colors.whiteLight}
              textAlign="center"
            />
          )}
        </View>
        <Button
          text={t('EXERCISE_ACTIVE.COMPLETE_EXERCISE')}
          type={exerciseIsCompleted ? BUTTON_TYPES.MAIN : BUTTON_TYPES.DISABLED}
          onPress={handleCompleteExercise}
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
  exerciseNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    flex: 1,
    marginRight: 12,
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
