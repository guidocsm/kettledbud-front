import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
    'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
  timeout: 15000,
})

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(async (response) => {
  return response.data
}, async (error) => {
  return Promise.reject(error)
})

export default apiClient