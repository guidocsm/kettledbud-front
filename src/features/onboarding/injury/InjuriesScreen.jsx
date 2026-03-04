import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'

import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { InjuriesCard } from './components/InjuriesCard'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PageWrapper from '@/src/components/PageWrapper'

export default function InjuriesScreen() {
  const { onboardingConfig, onboardingState, setOnboardingState } = useOnboarding()

  const { t } = useTranslation()
  const router = useRouter()

  const injuryOptions = [...onboardingConfig?.injuryOptions, {
    value: '',
    label: t('ONBOARDING.INJURIES.NONE'),
  }] ?? []

  const handlePress = (injuryValue) => {
    setOnboardingState((prev) => {
      const injuries = prev?.injuries ?? []

      if (injuryValue === '' || injuryValue == null) {
        return { ...prev, injuries: [''] }
      }

      const injuryItems = injuries.filter((i) => i !== '')
      if (injuries.includes('') || injuryItems.length === 0) {
        return { ...prev, injuries: [injuryValue] }
      }

      const filteredInjuries = injuryItems.includes(injuryValue)
        ? injuryItems.filter((i) => i !== injuryValue)
        : [...injuryItems, injuryValue]

      return { ...prev, injuries: filteredInjuries }
    })
  }

  const onSubmitOnboarding = async () => {
    const { gender, birthDate, bodyMetrics, goal, daysPerWeek, timePerSession, experience } = onboardingState
    const userInfo = {
      gender,
      birthDate,
      weight: bodyMetrics?.weight?.value,
      height: bodyMetrics?.height?.value,
      goal,
      daysPerWeek,
      timePerSession,
      currentLayer: experience === 'new' ? 1 : 2,
      isPremium: false
    }

    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    router.push(ROUTES_NAMES.PREPARING_PLAN)
  }

  if (!injuryOptions.length) {
    return null
  }

  return (
    <PageWrapper style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.content}>
          {injuryOptions.map((option) => (
            <InjuriesCard
              key={option.value}
              injury={option.label}
              onPress={() => handlePress(option.value)}
              selected={onboardingState?.injuries?.includes(option.value)}
            />
          ))}
        </View>
        <CustomText
          text="KettleBuddy no sustituye el consejo médico profesional. Si tienes alguna condición de salud, consulta con tu médico antes de empezar."
          color={colors.whiteLight}
          fontSize={14}
          fontWeight={400}
          lineHeight={24}
        />
      </View>
      <Button
        text={t('COMMON.CONTINUE')}
        type={(onboardingState?.injuries?.length ?? 0) > 0 ? BUTTON_TYPES.MAIN : BUTTON_TYPES.DISABLED}
        onPress={onSubmitOnboarding}
      />
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    gap: 20,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
})
