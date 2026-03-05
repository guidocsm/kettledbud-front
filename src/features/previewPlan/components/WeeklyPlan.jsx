import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'
import { Platform, StyleSheet, UIManager, View } from 'react-native'
import { RoutineCard } from './RoutineCard'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

export function WeeklyPlan({ previewPlan = null }) {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <CustomText
        text={t('PREVIEW_PLAN.WEEKLY_PLAN.TITLE')}
        color={colors.white}
        fontWeight={600}
        fontSize={20}
      />
      <View style={styles.planContainer}>
        {previewPlan?.routines?.map((routine) => (
          <RoutineCard key={routine.dayIndex} routine={routine} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  planContainer: {
    gap: 20,
  },
})
