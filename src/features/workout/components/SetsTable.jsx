import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

import SetRow from './SetRow'

/**
 * @param {object} props
 * @param {Array} props.sets - Array of local set objects
 * @param {number} props.activeSetIndex - Index of the currently active set (-1 if all done)
 * @param {(index: number, weight: string, reps: string) => void} props.onSetComplete
 * @param {(index: number, field: string, value: string) => void} props.onSetChange
 * @param {number} [props.savingSetIndex] - Index of set currently being saved (-1 if none)
 */
export default function SetsTable({ sets, activeSetIndex, onSetComplete, onSetChange, savingSetIndex = -1 }) {
  const { t } = useTranslation()

  const completedCount = sets.filter((s) => s.isCompleted).length

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText
          text={t('EXERCISE_ACTIVE.SERIES')}
          fontWeight={500}
          fontSize={18}
          color={colors.white}
        />
        <CustomText
          text={`${completedCount}/${sets.length}`}
          fontWeight={500}
          fontSize={14}
          color={colors.whiteLight}
        />
      </View>
      <View style={styles.columnHeaders}>
        <View style={styles.columnsGroup}>
          <CustomText
            text={t('EXERCISE_ACTIVE.SET')}
            fontWeight={500}
            fontSize={12}
            color={colors.whiteLight}
            extraStyle={styles.colSet}
          />
          <CustomText
            text={t('EXERCISE_ACTIVE.PREVIOUS')}
            fontWeight={500}
            fontSize={12}
            color={colors.whiteLight}
            extraStyle={styles.colPrevious}
          />
          <CustomText
            text={t('EXERCISE_ACTIVE.KG')}
            fontWeight={500}
            fontSize={12}
            color={colors.whiteLight}
            extraStyle={styles.colInput}
          />
          <CustomText
            text={t('EXERCISE_ACTIVE.REPS')}
            fontWeight={500}
            fontSize={12}
            color={colors.whiteLight}
            extraStyle={styles.colInput}
          />
        </View>
        <View style={styles.colCheck} />
      </View>
      <View style={styles.rows}>
        {sets.map((set, index) => (
          <SetRow
            key={set.exerciseSetId}
            setNumber={set.setNumber}
            previousWeight={set.previousWeight}
            previousReps={set.previousReps}
            weight={set.weight}
            reps={set.reps}
            isCompleted={set.isCompleted}
            isActive={index === activeSetIndex}
            loading={index === savingSetIndex}
            onComplete={(w, r) => onSetComplete(index, w, r)}
            onChange={(field, val) => onSetChange(index, field, val)}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnHeaders: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16.5,
    gap: 12,
  },
  columnsGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  colSet: {
    width: 28,
  },
  colPrevious: {
    flex: 1,
  },
  colInput: {
    width: 65,
  },
  colCheck: {
    width: 30,
  },
  rows: {
    gap: 14,
  },
})
