import { StyleSheet, View } from 'react-native'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { DatePicker } from '@/src/components/DatePicker'
import { Button } from '@/src/components/Button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useRouter } from 'expo-router'

export default function BirthdayScreen() {
  const { onboardingState, setOnboardingState } = useOnboarding()
  const { t } = useTranslation()
  const router = useRouter()

  const handleDateChange = (date) => {
    setOnboardingState((prev) => ({ ...prev, birthday: date }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DatePicker
          initialDate={onboardingState.birthday ?? null}
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
        type={onboardingState?.birthday ? 'main' : 'disabled'}
        onPress={() => {
          router.push('/onboarding/bodyMetrics')
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