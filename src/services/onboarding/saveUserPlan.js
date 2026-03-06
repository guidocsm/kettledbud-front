import AsyncStorage from '@react-native-async-storage/async-storage'
import apiClient from '../apiClient'

export async function saveUserPlan() {
  try {
    const previewPlanId = await AsyncStorage.getItem('previewPlanId')

    if (!previewPlanId) return

    const response = await apiClient.post('/save-plan', { previewPlanId })

    await AsyncStorage.removeItem('previewPlanId')
    await AsyncStorage.removeItem('previewPlan')

    return response
  } catch (err) {
    console.error('Error saving plan:', err)
  }
}
