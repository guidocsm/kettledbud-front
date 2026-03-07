import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { flushOnboardingData } from '@/src/services/onboarding/flushOnboardingData'
import { saveUserPlan } from '@/src/services/onboarding/saveUserPlan'
import { supabase } from '@/src/services/supabase/supabase'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

async function processAuthUrl(url, router) {
  const fragment = url.split('#')[1]
  if (!fragment) {
    router.replace(ROUTES_NAMES.PREVIEW_PLAN)
    return
  }

  const params = Object.fromEntries(
    fragment.split('&').map((pair) => pair.split('=')),
  )

  if (params.access_token && params.refresh_token) {
    const { error } = await supabase.auth.setSession({
      access_token: params.access_token,
      refresh_token: params.refresh_token,
    })
    if (error) throw error
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await flushOnboardingData()
    await saveUserPlan()
    router.replace(ROUTES_NAMES.HOME)
  } else {
    router.replace(ROUTES_NAMES.PREVIEW_PLAN)
  }
}

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const url = await Linking.getInitialURL()
        if (url) await processAuthUrl(url, router)
      } catch (err) {
        console.error('Auth callback error:', err)
        router.replace(ROUTES_NAMES.PREVIEW_PLAN)
      }
    }

    const subscription = Linking.addEventListener('url', async ({ url }) => {
      try {
        await processAuthUrl(url, router)
      } catch (err) {
        console.error('Auth callback error:', err)
        router.replace(ROUTES_NAMES.PREVIEW_PLAN)
      }
    })

    handleCallback()

    return () => subscription.remove()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18181B',
      }}
    >
      <ActivityIndicator size="large" color="#F59E0B" />
    </View>
  )
}
