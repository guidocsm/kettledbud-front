import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [onboardingState, setOnboardingState] = useState({})

  const setAnswer = useCallback((key, value) => {
    setAnswersState(prev => ({ ...prev, [key]: value }))
  }, [])

  const value = useMemo(
    () => ({ onboardingState, setOnboardingState }),
    [onboardingState, setOnboardingState]
  )

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
