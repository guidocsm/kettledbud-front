import { BurnIcon, CalendarIcon, GoalIcon, IOSWatchIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import StatsSummaryCard from '@/src/components/StatsSummaryCard'
import StatsSummaryItem from '@/src/components/StatsSummaryItem'
import { colors } from '@/src/constants/theme'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { GOALS_KEYS } from '../../onboarding/utils/constants'
import { LinearGradient } from 'expo-linear-gradient'

export function SummaryUserPlan({ durationWeeks = null, daysPerWeek = null, timePerSession = null, goal = null }) {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#57401A', colors.main]}
        start={{ x: .3, y: 0 }}
        end={{ x: 1.8, y: 0 }}
        style={styles.goalContainer}
      >
        <View style={styles.goalIconContainer}>
          <GoalIcon color={colors.main} />
        </View>
        <View style={styles.goalTextContainer}>
          <CustomText 
            text={t(`COMMON.GOALS_KEYS.${GOALS_KEYS[goal]}`)}
            color={colors.white}
            fontWeight={600}
            fontSize={18}
          />
          <CustomText 
            text={t('PREVIEW_PLAN.YOUR_GOAL')}
            color={colors.main}
            fontWeight={500}
            fontSize={14}
          />
        </View>
      </LinearGradient>
      <StatsSummaryCard>
        <StatsSummaryItem
          icon={<CalendarIcon color={colors.main} />}
          value={durationWeeks}
          label={t('PREVIEW_PLAN.WEEKS')}
        />
        <StatsSummaryItem
          icon={<BurnIcon color={colors.main} />}
          value={daysPerWeek}
          label={t('PREVIEW_PLAN.DAYS_WEEKS')}
        />
        <StatsSummaryItem
          icon={<IOSWatchIcon color={colors.main} />}
          value={timePerSession}
          label={t('PREVIEW_PLAN.MIN_SESSION')}
        />
      </StatsSummaryCard>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: 'hidden',
  },
  goalIconContainer: {
    backgroundColor: colors.mainLight,
    borderRadius: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
  },
  goalTextContainer: {
    gap: 6,
  },
})