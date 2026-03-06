import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { DatePicker } from '@/src/components/DatePicker'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { getDefaultBirthDate, isAtLeast16 } from '@/src/hooks/useBirthdayDate'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import PageWrapper from '@/src/components/PageWrapper'

const DEFAULT_BIRTH_DATE = getDefaultBirthDate()

export default function BirthDateScreen() {
  const { onboardingState, setOnboardingState } = useOnboarding()

  const { t } = useTranslation()
  const router = useRouter()
  const [showUnderAgeError, setShowUnderAgeError] = useState(false)

  useEffect(() => {
    if (!onboardingState.birthDate) {
      setOnboardingState((prev) => ({ ...prev, birthDate: DEFAULT_BIRTH_DATE }))
    }
  }, [])

  const birthDate = onboardingState.birthDate ?? DEFAULT_BIRTH_DATE

  const handleDateChange = (date) => {
    setShowUnderAgeError(false)
    setOnboardingState((prev) => ({
      ...prev,
      birthDate: date ?? DEFAULT_BIRTH_DATE,
    }))
  }

  const handleContinue = () => {
    if (!isAtLeast16(birthDate)) {
      setShowUnderAgeError(true)
      return
    }
    router.push(ROUTES_NAMES.BODY_METRICS)
  }

  return (
    <PageWrapper style={styles.container}>
      <View style={styles.content}>
        <DatePicker
          initialDate={birthDate}
          onDateChange={handleDateChange}
        />
        <CustomText
          text={t('ONBOARDING.BIRTHDAY.DISCLAIMER')}
          fontSize={14}
          color={colors.whiteLight}
        />
        {showUnderAgeError && (
          <CustomText
            text={t('ONBOARDING.BIRTHDAY.UNDER_AGE_ERROR')}
            fontSize={14}
            color={colors.error}
          />
        )}
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
})