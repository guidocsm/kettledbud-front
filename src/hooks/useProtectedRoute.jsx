import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ROUTES_NAMES } from '../routes/routesNames'
import { supabase } from '../services/supabase/supabase'

export const PUBLIC_ROUTES = [
  ROUTES_NAMES.INIT,
  ROUTES_NAMES.ONBOARDING,
  ROUTES_NAMES.SIGN_UP,
  ROUTES_NAMES.PREVIEW_PLAN,
]

let hasChecked = false

export function useProtectedRoute() {
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (hasChecked) {
      setIsReady(true)
      return
    }
    hasChecked = true

    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      const previewPlan = await AsyncStorage.getItem('previewPlan')

      if (data.session) {
        router.replace(ROUTES_NAMES.HOME)
      } else if (previewPlan) {
        router.replace(ROUTES_NAMES.PREVIEW_PLAN)
      } else {
        router.replace(ROUTES_NAMES.INIT)
      }

      setIsReady(true)
    }

    checkAuth()
  }, [])

  return { isReady }
}
