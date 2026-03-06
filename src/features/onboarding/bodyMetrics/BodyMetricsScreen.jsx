import { useRouter } from 'expo-router'
import { useEffect } from 'react'
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
  DEFAULT_HEIGHT_CM,
  DEFAULT_WEIGHT_KG,
  UNIT_HEIGHT_CM,
  UNIT_WEIGHT_KG,
} from '@/src/features/onboarding/bodyMetrics/utils/constants'
import PageWrapper from '@/src/components/PageWrapper'

const DEFAULT_BODY_METRICS = {
  height: { value: DEFAULT_HEIGHT_CM, unit: UNIT_HEIGHT_CM },
  weight: { value: DEFAULT_WEIGHT_KG, unit: UNIT_WEIGHT_KG },
}

export default function BodyMetricsScreen() {
  const { onboardingState, setOnboardingState } = useOnboarding()
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const { height, weight } = onboardingState?.bodyMetrics ?? {}
    if (!height || !weight) {
      setOnboardingState((prev) => ({
        ...prev,
        bodyMetrics: {
          ...prev.bodyMetrics,
          height: height ?? DEFAULT_BODY_METRICS.height,
          weight: weight ?? DEFAULT_BODY_METRICS.weight,
        },
      }))
    }
  }, [])

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

  const height = onboardingState?.bodyMetrics?.height ?? DEFAULT_BODY_METRICS.height
  const weight = onboardingState?.bodyMetrics?.weight ?? DEFAULT_BODY_METRICS.weight

  const handleContinue = () => {
    const currentHeight = onboardingState?.bodyMetrics?.height
    const currentWeight = onboardingState?.bodyMetrics?.weight
    if (!currentHeight || !currentWeight) {
      setOnboardingState((prev) => ({
        ...prev,
        bodyMetrics: {
          ...prev.bodyMetrics,
          height: currentHeight ?? DEFAULT_BODY_METRICS.height,
          weight: currentWeight ?? DEFAULT_BODY_METRICS.weight,
        },
      }))
    }
    router.push('/onboarding/injuries')
  }

  return (
    <PageWrapper style={styles.container}>
      <View style={styles.content}>
        <View style={styles.pickersRow}>
          <View style={styles.pickerHalf}>
            <BodyHeightPicker
              initialHeight={height.value}
              unit={height.unit}
              onHeightChange={(bodyMetrics) => handleBodyMetricsChange(BODY_METRICS_KEYS.HEIGHT, bodyMetrics)}
            />
          </View>
          <View style={styles.pickerHalf}>
            <BodyWeightPicker
              initialWeight={weight.value}
              unit={weight.unit}
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
        type={BUTTON_TYPES.MAIN}
        onPress={handleContinue}
      />
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
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