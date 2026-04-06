import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { BurnIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'
import SessionPath from '@/src/features/home/components/SessionPath'
import WeekSummaryPill from '@/src/features/home/components/WeekSummaryPill'
import { useGetSessionsHistory } from '@/src/features/home/hooks/useGetSessionsHistory'
import { useVisibleWeek } from '@/src/features/home/hooks/useVisibleWeek'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()

  const sessionsHistory = useGetSessionsHistory()
  const currentWeekNumber = sessionsHistory?.weekNumber ?? 0
  const totalWeeks = sessionsHistory?.totalWeeks ?? 0

  const {
    visibleWeek,
    handleSessionPathLayout,
    handleWeekLayout,
    handleScroll,
  } = useVisibleWeek({ currentWeekNumber })

  const displayWeek = visibleWeek ?? currentWeekNumber

  const weekTitle = displayWeek === currentWeekNumber 
    ? t('HOME.WEEK_TITLE', { current: currentWeekNumber, total: totalWeeks })
    : t('HOME.PAST_WEEK_TITLE', { week: displayWeek })

  const handleActiveSessionPress = () => {
    const sessionId = sessionsHistory?.nextSession?.sessionId

    if (sessionId) {
      router.push({ pathname: ROUTES_NAMES.PREWORKOUT, params: { sessionId } })
    }
  }

  return (
    <View style={styles.screen}>
      <PageWrapper
        style={styles.container}
        isScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <View style={styles.weekTextWrapper}>
            <CustomText
              fontWeight={700}
              fontSize={16}
              text={weekTitle}
              color={colors.whiteLight}
            />
          </View>
          <View style={styles.streakContainer}>
            <BurnIcon width={24} height={24} color={colors.main} />
            <CustomText
              fontWeight={800}
              fontSize={20}
              text="0"
              color={colors.white}
            />
          </View>
        </View>
        {sessionsHistory && (
          <View onLayout={handleSessionPathLayout}>
            <SessionPath
              sessionsHistory={sessionsHistory}
              onActiveSessionPress={handleActiveSessionPress}
              onWeekLayout={handleWeekLayout}
            />
          </View>
        )}
      </PageWrapper>
      <WeekSummaryPill
        totalSessions={sessionsHistory?.totalSessions ?? 0}
        completedSessions={sessionsHistory?.completedSessions ?? 0}
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
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    width: '100%',
  },
  weekTextWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  streakContainer: {
    backgroundColor: '#252525',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    gap: 10,
  },
})
