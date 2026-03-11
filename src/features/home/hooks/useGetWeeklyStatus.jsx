import apiClient from '@/src/services/apiClient'
import { useEffect, useState } from 'react'

export function useGetWeeklyStatus() {
  const [weeklyStatus, setWeeklyStatus] = useState(null)

  useEffect(() => {
    const fetchWeeklyStatus = async () => {
      try {
        const response = await apiClient.get('/weekly-status')
        setWeeklyStatus(response ?? null)
      } catch (error) {
        console.log('error fetching weekly status', error)
      }
    }
    fetchWeeklyStatus()
  }, [])

  return weeklyStatus
}
