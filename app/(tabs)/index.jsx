import { BurnIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'
import { useGetWeeklyStatus } from '@/src/features/home/hooks/useGetWeeklyStatus'
import SessionPath from '@/src/features/home/SessionPath'
import WeekSummaryPill from '@/src/features/home/WeekSummaryPill'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { supabase } from '@/src/services/supabase/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation()

  const weeklyStatus = useGetWeeklyStatus()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    await AsyncStorage.removeItem('userInfo')
    await AsyncStorage.removeItem('previewPlan')
    await AsyncStorage.removeItem('previewPlanId')
    router.replace(ROUTES_NAMES.INIT)
  }

  const totalSessions = weeklyStatus?.totalSessions ?? 0
  const completedSessions = weeklyStatus?.completedSessions ?? 0

  const weekTitle =
    weeklyStatus != null
      ? t('HOME.WEEK_TITLE', {
          current: weeklyStatus.weekNumber,
          total: weeklyStatus.totalWeeks,
        })
      : ''

  const handleActiveSessionPress = () => {
    // Placeholder navigation for workout session
    console.log('Navigate to workout session', weeklyStatus?.nextSession)
  }

  return (
    <PageWrapper style={styles.container} isScrollView>
      <View style={styles.header}>
        <View style={styles.weekTextWrapper}>
          <CustomText
            fontWeight={700}
            fontSize={16}
            text={weekTitle}
            color={colors.whiteLight}
            extraStyle={styles.weekText}
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
      {weeklyStatus && (
        <SessionPath
          weeklyStatus={weeklyStatus}
          onActiveSessionPress={handleActiveSessionPress}
        />
      )}
      <WeekSummaryPill
        totalSessions={totalSessions}
        completedSessions={completedSessions}
      />
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
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
