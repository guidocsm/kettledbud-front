import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'
import { DAY_STATUS } from '../utils/constants'

export function SessionNode({ day, position }) {
  const { t } = useTranslation()

  const isSessionCompleted = day.status === DAY_STATUS.COMPLETED
  const isSessionMissed = day.status === DAY_STATUS.MISSED
  const containerAlign = position === 'left' ? 'flex-start' : 'flex-end'

  const circleStyle = [
    styles.circle,
    isSessionCompleted && styles.circleCompleted,
    isSessionMissed && styles.circleMissed,
  ]

  return (
    <View style={[styles.container, { alignItems: containerAlign }]}>
      <View style={styles.nodeColumn}>
        <View style={circleStyle}>
          {isSessionCompleted && <View style={styles.checkmark} />}
          {isSessionMissed && <View style={styles.missedDot} />}
        </View>
        <CustomText
          text={
            day?.dayLabel != null ? t(`HOME.DAY_LABELS.${day.dayLabel}`) : ''
          }
          fontWeight={500}
          fontSize={18}
          color={colors.gray}
          textAlign="center"
        />
        {isSessionCompleted && day?.muscleGroup != null && (
          <CustomText
            text={t(`HOME.MUSCLE_GROUPS.${day.muscleGroup}`)}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  nodeColumn: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 15,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  circleCompleted: {
    backgroundColor: '#34D399',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  circleMissed: {
    backgroundColor: colors.gray,
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
    width: 14,
    height: 14,
    borderRadius: 20,
    backgroundColor: '#505050',
  },
})

export default SessionNode
