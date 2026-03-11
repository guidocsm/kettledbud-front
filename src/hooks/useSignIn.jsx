import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ROUTES_NAMES } from '../routes/routesNames'
import { signInWithGoogle } from '../services/googleAuth'
import { flushOnboardingData } from '../services/onboarding/flushOnboardingData'
import { saveUserPlan } from '../services/onboarding/saveUserPlan'
import { sendMagicLink } from '../services/supabase/magicLinkAuth'

export const useSignIn = () => {
  const [isSigningWithEmail, setIsSigningWithEmail] = useState(false)
  const [isSigningWithGoogle, setIsSigningWithGoogle] = useState(false)
  const [isSentEmail, setIsSentEmail] = useState(false)

  const router = useRouter()

  const onSignInWithGoogle = async () => {
    setIsSigningWithGoogle(true)
    try {
      const data = await signInWithGoogle()
      if (data) {
        await flushOnboardingData()
        await saveUserPlan()
        router.replace(ROUTES_NAMES.HOME)
        await AsyncStorage.removeItem('previewPlan')
      }
    } catch (err) {
      console.log('error', err)
    } finally {
      setIsSigningWithGoogle(false)
    }
  }

  const onSignInWithEmail = async (email) => {
    setIsSigningWithEmail(true)
    try {
      await sendMagicLink(email)
      setIsSentEmail(true)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsSigningWithEmail(false)
    }
  }

  return {
    isSigningWithEmail,
    isSigningWithGoogle,
    isSentEmail,
    setIsSentEmail,
    onSignInWithGoogle,
    onSignInWithEmail,
  }
}
