import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateProfile } from '../user/updateProfile.js'

export async function flushOnboardingData() {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo')
    if (!userInfo) return

    const onboarding = JSON.parse(userInfo)

    const profileData = {
      firstName: null,
      lastName: null,
      gender: onboarding.gender,
      birthDate: onboarding.birthDate,
      weight: onboarding.weight,
      height: onboarding.height,
      goal: onboarding.goal,
      daysPerWeek: onboarding.daysPerWeek,
      timePerSession: onboarding.timePerSession,
      currentLayer: onboarding.currentLayer,
      isPremium: onboarding.isPremium,
    }

    await updateProfile(profileData)

    await AsyncStorage.removeItem('userInfo')
  } catch (err) {
    console.error('Error flushing onboarding data:', err)
  }
}
