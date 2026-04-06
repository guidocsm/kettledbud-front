import { useEffect, useState } from 'react'

import { getExerciseDetail } from '@/src/services/workout/getExerciseDetail'

export function useGetExerciseDetail(sessionId, exerciseId) {
  const [exerciseDetail, setExerciseDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        setLoading(true)
        const data = await getExerciseDetail(sessionId, exerciseId)
        setExerciseDetail(data)
      } catch (err) {
        console.log('Error fetching exercise detail:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (sessionId && exerciseId) {
      fetchExerciseDetail()
    }
  }, [sessionId, exerciseId])

  return { exerciseDetail, loading, error }
}
