import { CheckIcon, DumbbellIcon, IOSWatchIcon } from '@/assets/Icons'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Animated, InteractionManager, Modal, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import StatsSummaryCard from '@/src/components/StatsSummaryCard'
import StatsSummaryItem from '@/src/components/StatsSummaryItem'
import { colors } from '@/src/constants/theme'
import { formatVolume } from '@/src/utils/formatters'
import { formatDurationMinutes } from '@/src/utils/time'

import useWorkoutStore from '@/src/stores/useWorkoutStore'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function WorkoutCompletedModal() {
  const { t } = useTranslation()
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const workoutSummary = useWorkoutStore((state) => state.workoutSummary)
  const resetWorkout = useWorkoutStore((state) => state.resetWorkout)
  const isVisible = Boolean(workoutSummary)

  useEffect(() => {
    if (!isVisible) {
      fadeAnim.setValue(0)
      return
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start()
  }, [isVisible])

  const handleClose = () => {
    router.replace(ROUTES_NAMES.HOME)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        InteractionManager.runAfterInteractions(() => {
          resetWorkout()
        })
      })
    })
  }

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Mascot style={styles.mascot} />
        <View style={styles.textContainer}>
          <CustomText
            text={t('WORKOUT_COMPLETED.TITLE')}
            color={colors.main}
            fontWeight={700}
            fontSize={30}
            textAlign="center"
          />
          <CustomText
            text={t('WORKOUT_COMPLETED.SUBTITLE')}
            color={colors.white}
            fontWeight={600}
            fontSize={16}
            textAlign="center"
            lineHeight={22}
          />
        </View>
        <StatsSummaryCard style={styles.statsCard}>
          <StatsSummaryItem
            icon={<CheckIcon width={20} height={20} color={colors.main} />}
            value={`${workoutSummary?.completedExercises ?? 0}`}
            label={t('WORKOUT_COMPLETED.STATS.EXERCISES')}
            valueFontSize={20}
            labelFontSize={14}
          />
          <StatsSummaryItem
            icon={<DumbbellIcon width={20} height={20} color={colors.main} />}
            value={formatVolume(workoutSummary?.totalVolume)}
            label={t('WORKOUT_COMPLETED.STATS.VOLUME')}
            valueFontSize={20}
            labelFontSize={14}
          />
          <StatsSummaryItem
            icon={<IOSWatchIcon width={20} height={20} color={colors.main} />}
            value={formatDurationMinutes(workoutSummary?.durationMinutes)}
            label={t('WORKOUT_COMPLETED.STATS.DURATION')}
            valueFontSize={20}
            labelFontSize={14}
          />
        </StatsSummaryCard>
        <Button
          text={t('COMMON.CLOSE')}
          onPress={handleClose}
        />
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 200,
    paddingBottom: 40,
  },
  mascot: {
    width: 218,
    height: 150,
  },
  textContainer: {
    alignItems: 'center',
    gap: 14,
  },
  statsCard: {
    width: '100%',
  },
})
