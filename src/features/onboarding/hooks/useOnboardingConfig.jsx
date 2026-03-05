import { useEffect, useState } from 'react'

import apiClient from '@/src/services/apiClient'

export function useOnboardingConfig() {
  const [onboardingConfig, setOnboardingConfig] = useState(null)

  useEffect(() => {
    async function fetchConfig() {
      try {
        const data = await apiClient.get('/onboarding-config')
        setOnboardingConfig(data)
      } catch (error) {
        console.error('Error fetching onboarding config:', error)
      }
    }
    fetchConfig()
  }, [])

  return onboardingConfig || null
}