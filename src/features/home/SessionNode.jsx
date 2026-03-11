import React from 'react'
import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'

/**
 * @typedef {'left' | 'right'} SessionNodePosition
 *
 * @typedef {Object} SessionNodeProps
 * @property {{ dayLabel: number, status: 'active' | 'completed' | 'missed', muscleGroup?: string, routineName?: string }} day
 * @property {SessionNodePosition} position
 */

/**
 * Single history node in the session path (completed or missed).
 *
 * @param {SessionNodeProps} props
 */
export function SessionNode({ day, position }) {
  const { t } = useTranslation()

  const isCompleted = day.status === 'completed'
  const isMissed = day.status === 'missed'

  const dayLabelKey = String(day.dayLabel)
  const dayLabel = t(`HOME.DAY_LABELS.${dayLabelKey}`, { defaultValue: '' })

  const muscleGroupKey = day.muscleGroup ?? null
  const muscleGroupLabel =
    isCompleted && muscleGroupKey != null
      ? t(`HOME.MUSCLE_GROUPS.${muscleGroupKey}`, { defaultValue: '' })
      : ''

  const containerAlign = position === 'left' ? 'flex-start' : 'flex-end'

  const circleStyle = [
    styles.circle,
    isCompleted && styles.circleCompleted,
    isMissed && styles.circleMissed,
  ]

  return (
    <View style={[styles.container, { alignItems: containerAlign }]}>
      <View style={styles.nodeColumn}>
        <View style={circleStyle}>
          {isCompleted && <View style={styles.checkmark} />}
          {isMissed && <View style={styles.missedDot} />}
        </View>
        <CustomText
          text={dayLabel}
          fontWeight={600}
          fontSize={14}
          color={colors.white}
          textAlign="center"
        />
        {isCompleted && !!muscleGroupLabel && (
          <CustomText
            text={muscleGroupLabel}
            fontWeight={500}
            fontSize={13}
            color={colors.whiteLight}
            textAlign="center"
          />
        )}
      </View>
    </View>
  )
}

const NODE_SIZE = 52

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  nodeColumn: {
    alignItems: 'center',
    marginHorizontal: 24,
  },
  circle: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: NODE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  circleCompleted: {
    backgroundColor: '#34D399',
  },
  circleMissed: {
    backgroundColor: '#374151',
  },
  checkmark: {
    width: 20,
    height: 10,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.dark,
    transform: [{ rotate: '-45deg' }],
  },
  missedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4B5563',
  },
})

export default SessionNode

