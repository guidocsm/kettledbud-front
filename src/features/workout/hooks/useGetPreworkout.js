import { useEffect, useState } from 'react'

import { getPreworkout } from '@/src/services/workout/getPreworkout'

export function useGetPreworkout(sessionId) {
  const [preworkout, setPreworkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPreworkout = async () => {
      try {
        setLoading(true)
        const data = await getPreworkout(sessionId)
        setPreworkout(data)
      } catch (err) {
        console.log('Error fetching preworkout:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchPreworkout()
    }
  }, [sessionId])

  const updateStatus = (newStatus) => {
    setPreworkout((prev) => prev ? { ...prev, status: newStatus } : prev)
  }

  return { preworkout, loading, error, updateStatus }
}
