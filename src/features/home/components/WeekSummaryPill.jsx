import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'

export function WeekSummaryPill({ totalSessions, completedSessions }) {
  const { t } = useTranslation()
  const [containerWidth, setContainerWidth] = useState(0)

  const safeTotalSessions = Math.max(totalSessions, 0)
  const safeCompletedSessions = Math.min(Math.max(completedSessions, 0), safeTotalSessions)

  const remainingSessions = Math.max(safeTotalSessions - safeCompletedSessions, 0)

  const labelText = t('HOME.REMAINING_SESSIONS', { count: remainingSessions })
  const progress = safeTotalSessions > 0 ? safeCompletedSessions / safeTotalSessions : 0

  const handleLayout = (e) => {
    setContainerWidth(e.nativeEvent.layout.width)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container} onLayout={handleLayout}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
        <View style={styles.labelWrapper}>
          <CustomText text={labelText} fontWeight={600} fontSize={14} color={colors.whiteLight} textAlign="center" />
        </View>
        <View style={[styles.clipWrapper, { width: `${progress * 100}%` }]}>
          <View style={[styles.labelWrapper, { width: containerWidth }]}>
            <CustomText text={labelText} fontWeight={600} fontSize={14} color={colors.dark} textAlign="center" />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 30,
  },
  container: {
    backgroundColor: '#252525',
    borderRadius: 50,
    overflow: 'hidden',
    paddingVertical: 10,
  },
  barFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.success,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  labelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  clipWrapper: {
    position: 'absolute',
    top: 10,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
})

export default WeekSummaryPill
