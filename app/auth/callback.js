import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { flushOnboardingData } from '@/src/services/onboarding/flushOnboardingData'
import { saveUserPlan } from '@/src/services/onboarding/saveUserPlan'
import { supabase } from '@/src/services/supabase/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

let isProcessing = false

async function processAuthUrl(url, router) {
  const fragment = url.split('#')[1]
  if (!fragment) {
    router.replace(ROUTES_NAMES.PREVIEW_PLAN)
    return
  }

  const params = Object.fromEntries(
    fragment.split('&').map((pair) => pair.split('=')),
  )

  if (params.error) {
    router.replace(ROUTES_NAMES.INIT)
    return
  }

  if (params.access_token && params.refresh_token) {
    const {
      data: { session: existingSession },
    } = await supabase.auth.getSession()

    if (!existingSession) {
      const { error } = await supabase.auth.setSession({
        access_token: params.access_token,
        refresh_token: params.refresh_token,
      })
      if (error) {
        const isAlreadyUsed = error.message?.includes('Already Used')
        if (!isAlreadyUsed) throw error
      }
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await flushOnboardingData()
    await saveUserPlan()
    await AsyncStorage.removeItem('previewPlan')
    router.replace(ROUTES_NAMES.HOME)
  } else {
    router.replace(ROUTES_NAMES.PREVIEW_PLAN)
  }
}

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleUrl = async (url) => {
      if (isProcessing) return
      isProcessing = true
      try {
        await processAuthUrl(url, router)
      } catch (err) {
        console.error('Auth callback error:', err)
        router.replace(ROUTES_NAMES.INIT)
      } finally {
        isProcessing = false
      }
    }

    const handleCallback = async () => {
      const url = await Linking.getInitialURL()
      if (url) await handleUrl(url)
    }

    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleUrl(url)
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
