import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { BodyHeightPicker } from '@/src/components/BodyHeightPicker'
import { BodyWeightPicker } from '@/src/components/BodyWeightPicker'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import {
  BODY_METRICS_KEYS,
  UNIT_HEIGHT_CM,
  UNIT_WEIGHT_KG,
} from '@/src/features/onboarding/bodyMetrics/utils/constants'

export default function BodyMetricsScreen() {
  const { onboardingState, setOnboardingState } = useOnboarding()
  const { t } = useTranslation()
  const router = useRouter()

  const handleBodyMetricsChange = (key, bodyMetrics) => {
    setOnboardingState((prev) => ({
      ...prev,
      bodyMetrics: {
        ...prev.bodyMetrics,
        [key]: {
          value: bodyMetrics.value,
          unit: bodyMetrics.unit,
        }
      },
    }))
  }

  const canContinue = onboardingState?.bodyMetrics?.height && onboardingState?.bodyMetrics?.weight

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.pickersRow}>
          <View style={styles.pickerHalf}>
            <BodyHeightPicker
              initialHeight={onboardingState.bodyMetrics?.height?.value ?? null}
              unit={onboardingState.bodyMetrics?.height?.unit ?? UNIT_HEIGHT_CM}
              onHeightChange={(bodyMetrics) => handleBodyMetricsChange(BODY_METRICS_KEYS.HEIGHT, bodyMetrics)}
            />
          </View>
          <View style={styles.pickerHalf}>
            <BodyWeightPicker
              initialWeight={onboardingState.bodyMetrics?.weight?.value ?? null}
              unit={onboardingState.bodyMetrics?.weight?.unit ?? UNIT_WEIGHT_KG}
              onWeightChange={(bodyMetrics) => handleBodyMetricsChange(BODY_METRICS_KEYS.WEIGHT, bodyMetrics)}
            />
          </View>
        </View>
        <CustomText
          text={t('ONBOARDING.BODY_METRICS.DISCLAIMER')}
          fontSize={14}
          color={colors.whiteLight}
        />
      </View>
      <Button
        text={t('COMMON.CONTINUE')}
        type={canContinue ? BUTTON_TYPES.MAIN : BUTTON_TYPES.DISABLED}
        onPress={() => {
          router.push('/onboarding/injuries')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    gap: 20,
  },
  pickersRow: {
    flexDirection: 'row',
    gap: 16,
  },
  pickerHalf: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    overflow: 'hidden',
  },
})