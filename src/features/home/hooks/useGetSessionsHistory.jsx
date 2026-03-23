import apiClient from '@/src/services/apiClient'
import { useEffect, useState } from 'react'

export function useGetSessionsHistory() {
  const [sessionsHistory, setSessionsHistory] = useState(null)

  useEffect(() => {
    const fetchWeeklyStatus = async () => {
      try {
        const response = await apiClient.get('/sessions-history')
        setSessionsHistory(response.data)
      } catch (error) {
        console.log('error fetching weekly status', error)
      }
    }
    fetchWeeklyStatus()
  }, [])

  return sessionsHistory
}
