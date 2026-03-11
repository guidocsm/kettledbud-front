import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'

export function WeekSummaryPill({ totalSessions, completedSessions }) {
  const { t } = useTranslation()

  const remainingSessions = Math.max(totalSessions - completedSessions, 0)
  const allCompleted = totalSessions > 0 && remainingSessions === 0

  const labelText = allCompleted
    ? t('HOME.WEEK_COMPLETED')
    : t('HOME.REMAINING_SESSIONS', { count: remainingSessions })

  const maxDots = totalSessions
  const filledDots =
    totalSessions > 0
      ? Math.min(
          maxDots,
          Math.round((completedSessions / totalSessions) * maxDots),
        )
      : 0

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {Array.from({ length: maxDots }).map((_, index) => {
          const isFilled = index < filledDots
          return (
            <View
              key={index}
              style={[styles.dot, isFilled && styles.dotFilled]}
            />
          )
        })}
      </View>
      <CustomText
        text={labelText}
        fontWeight={500}
        fontSize={14}
        color={colors.white}
        textAlign="center"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#27272F',
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 10,
    position: 'absolute',
    bottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    columnGap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4B5563',
  },
  dotFilled: {
    backgroundColor: colors.main,
  },
})

export default WeekSummaryPill
