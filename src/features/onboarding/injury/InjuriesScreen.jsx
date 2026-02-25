import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { OnboardingCard } from '@/src/features/onboarding/components/OnboardingCard'
import { colors } from '@/src/constants/theme'
import { ONBOARDING } from '@/src/features/onboarding/utils/constants'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import { useRouter } from 'expo-router'
import { InjuriesCard } from './components/InjuriesCard'
import { Button } from '@/src/components/Button'

export default function InjuriesScreen() {
  const { t } = useTranslation()
  const router = useRouter()
  const { onboardingState, setOnboardingState } = useOnboarding()

  const handlePress = (injurySlug) => {
    setOnboardingState(prev => {
      const injuries = prev?.injuries ?? []

      if (injurySlug === '') {
        return { ...prev, injuries: [''] }
      }

      const injuryItems = injuries.filter(i => i !== '')
      if (injuries.includes('') || injuryItems.length === 0) {
        return { ...prev, injuries: [injurySlug] }
      }

      const filteredInjuries = injuryItems.includes(injurySlug)
        ? injuryItems.filter(i => i !== injurySlug)
        : [...injuryItems, injurySlug]

      return { ...prev, injuries: filteredInjuries }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {ONBOARDING.INJURIES.map((injury) => (
          <InjuriesCard
            key={injury.slug}
            injury={injury.title}
            onPress={() => handlePress(injury.slug)}
            selected={onboardingState?.injuries?.includes(injury.slug)}
          />
        ))}
      </View>
      <Button
        text={t('COMMON.CONTINUE')}
        type={(onboardingState?.injuries?.length ?? 0) > 0 ? 'main' : 'disabled'}
        onPress={() => router.push('/onboarding/summary')}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
})
