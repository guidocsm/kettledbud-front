import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { BackIcon, ClockIcon, GoalIcon } from '@/assets/Icons'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'

import ExerciseCard from './components/ExerciseCard'
import ProgressBar from './components/ProgressBar'
import RestStepper from './components/RestStepper'
import { useGetPreworkout } from './hooks/useGetPreworkout'

export default function PreworkoutScreen() {
  const { sessionId } = useLocalSearchParams()
  const { t } = useTranslation()
  const router = useRouter()

  const { preworkout, loading } = useGetPreworkout(sessionId)
  const [restTime, setRestTime] = useState(null)

  const effectiveRestTime = restTime ?? preworkout?.restTime ?? 90

  const isInProgress = preworkout?.status === 'in_progress'

  const completedCount = useMemo(() => {
    if (!preworkout?.exercises) return 0
    return preworkout.exercises.filter((e) => e.status === 'completed').length
  }, [preworkout?.exercises])

  const totalExercises = preworkout?.exercises?.length ?? 0
  const progress = totalExercises > 0 ? completedCount / totalExercises : 0

  const muscleGroupLabel = preworkout?.muscleGroup
    ? t(`HOME.MUSCLE_GROUPS.${preworkout.muscleGroup}`)
    : ''

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
        <ProgressBar progress={progress} />
        <RestStepper value={effectiveRestTime} onChange={setRestTime} />
        <View style={styles.exercisesContainer}>
          <View style={styles.exercisesHeader}>
            <CustomText
              text={t('PREWORKOUT.EXERCISES')}
              fontWeight={500}
              fontSize={18}
              color={colors.white}
            />
            <CustomText
              text={`${completedCount}/${totalExercises}`}
              fontWeight={600}
              fontSize={16}
              color={colors.whiteLight}
            />
          </View>
          <View style={styles.exerciseList}>
            {preworkout.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.exerciseId}
                name={exercise.name}
                image={exercise.image}
                sets={exercise.sets}
                status={exercise.status}
              />
            ))}
          </View>
        </View>
        <Button
          text={
            isInProgress
              ? t('PREWORKOUT.CONTINUE_ROUTINE')
              : t('PREWORKOUT.START_ROUTINE')
          }
          type={BUTTON_TYPES.MAIN}
          onPress={() => {}}
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
