import { useEffect, useMemo, useState } from 'react'

import useWorkoutStore from '@/src/stores/useWorkoutStore'
import { formatElapsedTime } from '@/src/utils/time'
import { WORKOUT_STATUS } from '@/src/features/workout/utils/constants'

export const useElapsedTime = () => {
  const startedAt = useWorkoutStore((state) => state.startedAt)
  const status = useWorkoutStore((state) => state.status)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (status !== WORKOUT_STATUS.IN_PROGRESS || !startedAt) return undefined

    const intervalId = setInterval(() => {
      setTick((currentTick) => currentTick + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [status, startedAt])

  return useMemo(() => {
    if (status !== WORKOUT_STATUS.IN_PROGRESS || !startedAt) return null

    const startTimestamp = new Date(startedAt).getTime()
    if (Number.isNaN(startTimestamp)) return null

    return formatElapsedTime(Date.now() - startTimestamp)
  }, [status, startedAt, tick])
}
