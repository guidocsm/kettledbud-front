import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useOnboardingConfig } from '../features/onboarding/hooks/useOnboardingConfig'

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [onboardingState, setOnboardingState] = useState(null)

  const onboardingConfig = useOnboardingConfig()

  const value = useMemo(() => ({
    onboardingState,
    setOnboardingState,
    onboardingConfig,
  }),
  [onboardingState, setOnboardingState, onboardingConfig])

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}
