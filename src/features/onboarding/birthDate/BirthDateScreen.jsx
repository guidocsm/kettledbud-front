import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { DatePicker } from '@/src/components/DatePicker'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function BirthDateScreen() {
  const { onboardingState, setOnboardingState } = useOnboarding()

  const { t } = useTranslation()
  const router = useRouter()

  const handleDateChange = (date) => {
    setOnboardingState((prev) => ({ ...prev, birthDate: date }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DatePicker
          initialDate={onboardingState.birthDate ?? null}
          onDateChange={handleDateChange}
        />
        <CustomText
          text={t('ONBOARDING.BIRTHDAY.DISCLAIMER')}
          fontSize={14}
          color={colors.whiteLight}
        />
      </View>
      <Button
        text={t('COMMON.CONTINUE')}
        type={onboardingState?.birthDate ? BUTTON_TYPES.MAIN : BUTTON_TYPES.DISABLED}
        onPress={() => {
          router.push(ROUTES_NAMES.BODY_METRICS)
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
})