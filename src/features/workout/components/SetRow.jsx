import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { CheckIcon } from '@/assets/Icons'

const formatPrevious = (weight, reps) => {
  if (weight == null && reps == null) return '—'
  return `${weight ?? '—'}x${reps ?? '—'}`
}

/**
 * @param {object} props
 * @param {number} props.setNumber
 * @param {number|null} props.previousWeight
 * @param {number|null} props.previousReps
 * @param {string} props.weight - Current weight input value
 * @param {string} props.reps - Current reps input value
 * @param {boolean} props.isCompleted
 * @param {boolean} props.isActive
 * @param {(weight: string, reps: string) => void} props.onComplete
 * @param {(field: string, value: string) => void} props.onChange
 * @param {boolean} [props.loading] - Whether PATCH is in flight for this set
 */
export default function SetRow({
  setNumber,
  previousWeight,
  previousReps,
  weight,
  reps,
  isCompleted,
  isActive,
  loading,
  onComplete,
  onChange,
}) {
  const { t } = useTranslation()

  return (
    <View style={[
      styles.row, 
      isActive && styles.rowActive,
      isCompleted && styles.rowCompleted
      ]}>
      <View style={styles.columnsGroup}>
        <View style={styles.numberColumn}>
          <CustomText
            text={String(setNumber)}
            fontWeight={isActive ? 700 : 500}
            fontSize={16}
            color={isActive ? colors.main : colors.whiteLight}
          />
        </View>
        <View style={styles.previousColumn}>
          <CustomText
            text={formatPrevious(previousWeight, previousReps)}
            fontWeight={400}
            fontSize={13}
            color={colors.whiteLight}
          />
        </View>
        {isActive ? (
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={(val) => onChange('weight', val)}
            placeholder="0"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
          />
        ) : (
          <View style={styles.inputReadonly}>
            <CustomText
              text={isCompleted ? (weight || '-') : t('EXERCISE_ACTIVE.KG_PLACEHOLDER')}
              fontWeight={400}
              fontSize={13}
              color={isCompleted ? colors.whiteLight : colors.gray}
            />
          </View>
        )}
        {isActive ? (
          <TextInput
            style={styles.input}
            value={reps}
            onChangeText={(val) => onChange('reps', val)}
            placeholder="0"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
          />
        ) : (
          <View style={styles.inputReadonly}>
            <CustomText
              text={isCompleted ? (reps || '-') : t('EXERCISE_ACTIVE.REPS_PLACEHOLDER')}
              fontWeight={400}
              fontSize={13}
              color={isCompleted ? colors.whiteLight : colors.gray}
            />
          </View>
        )}
      </View>
      {isActive ? (
        <TouchableOpacity
          style={[styles.check, styles.checkActive, loading && styles.checkLoading]}
          onPress={() => onComplete(weight, reps)}
          disabled={loading}
          activeOpacity={0.7}
        >
          <CheckIcon width={20} height={20} />
        </TouchableOpacity>
      ) : (
        <View style={[styles.check, isCompleted ? styles.checkCompleted : styles.checkInactive]}>
          {isCompleted ? (
            <CheckIcon width={20} height={20} color={colors.darkLight} />
          ) : (
            <View style={styles.bulletCircleInactive} />
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 12,
    height: 65,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  rowActive: {
    // borderColor: colors.main,
  },
  rowCompleted: {
    borderWidth: 1,
    borderColor: `${colors.success}33`,
  },
  columnsGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  numberColumn: {
    width: 28,
  },
  previousColumn: {
    flex: 1,
  },
  input: {
    backgroundColor: '#333333',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.main,
    color: colors.white,
    fontSize: 16,
    paddingLeft: 10,
    width: 65,
    height: 35,
  },
  inputReadonly: {
    backgroundColor: '#333333',
    borderRadius: 4,
    width: 65,
    height: 35,
    paddingLeft: 10,
    paddingTop: 8,
  },
  checkCircleActive: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleCompleted: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleEmpty: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#555555',
  },
  check: {
    height: 35,
    width: 35,
    // backgroundColor: colors.gray,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletCircleActive: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: colors.dark,
  },
  bulletCircleInactive: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#505050',
  },
  checkActive: {
    backgroundColor: colors.main,
  },
  checkLoading: {
    opacity: 0.5,
  },
  checkInactive: {
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.gray,
  },
  checkCompleted: {
    backgroundColor: `${colors.success}33`,
  },
})
