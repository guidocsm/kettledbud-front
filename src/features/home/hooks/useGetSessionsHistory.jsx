import apiClient from '@/src/services/apiClient'
import { useEffect, useState } from 'react'

export function useGetSessionsHistory() {
  const [sessionsHistory, setSessionsHistory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeeklyStatus = async () => {
      try {
        setLoading(true)
        const response = await apiClient.get('/sessions-history')
        setSessionsHistory(response.data)
      } catch (error) {
        console.log('error fetching weekly status', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWeeklyStatus()
  }, [])

  return { sessionsHistory, loading }
}
