import axios from 'axios'
import { supabase } from './supabase/supabase'

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1`,
  headers: {
    'Content-Type': 'application/json',
    apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
  timeout: 15000,
})

apiClient.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  } else {
    config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`
  }

  return config
})

apiClient.interceptors.response.use(
  async (response) => {
    return response.data
  },
  async (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
