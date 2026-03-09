import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ROUTES_NAMES } from '../routes/routesNames'
import { supabase } from '../services/supabase/supabase'

export const PUBLIC_ROUTES = [
  ROUTES_NAMES.INIT,
  ROUTES_NAMES.ONBOARDING,
  ROUTES_NAMES.PREVIEW_PLAN,
  ROUTES_NAMES.AUTH,
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
      const initialUrl = await Linking.getInitialURL()
      if (initialUrl?.includes(ROUTES_NAMES.AUTH_CALLBACK)) {
        setIsReady(true)
        return
      }

      const { data } = await supabase.auth.getSession()
      const previewPlan = await AsyncStorage.getItem('previewPlan')

      if (data.session) {
        router.replace(ROUTES_NAMES.TABS)
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
