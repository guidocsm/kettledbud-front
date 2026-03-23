import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Determines which week is currently visible in the scroll view.
 * Uses measured layout offsets from `SessionPath` (per-week sections).
 */
export function useVisibleWeek({ currentWeekNumber, scrollWeekThreshold = 200 }) {
  const [visibleWeek, setVisibleWeek] = useState(null)

  const sessionPathOffsetRef = useRef(0)
  const weekPositionsRef = useRef({})

  useEffect(() => {
    setVisibleWeek(null)
    sessionPathOffsetRef.current = 0
    weekPositionsRef.current = {}
  }, [currentWeekNumber])

  const handleSessionPathLayout = useCallback((e) => {
    sessionPathOffsetRef.current = e.nativeEvent.layout.y
  }, [])

  const handleWeekLayout = useCallback((weekNumber, relativeY) => {
    weekPositionsRef.current[weekNumber] = relativeY
  }, [])

  const handleScroll = useCallback(
    (e) => {
      const scrollY = e.nativeEvent.contentOffset.y
      const pathOffset = sessionPathOffsetRef.current
      const positions = weekPositionsRef.current

      const sortedWeeks = Object.entries(positions)
        .map(([weekNum, relY]) => ({
          weekNumber: Number(weekNum),
          absY: pathOffset + relY,
        }))
        .sort((a, b) => a.absY - b.absY)

      if (sortedWeeks.length === 0) {
        setVisibleWeek(currentWeekNumber)
        return
      }

      let week = currentWeekNumber
      for (const { weekNumber, absY } of sortedWeeks) {
        if (scrollY + scrollWeekThreshold >= absY) {
          week = weekNumber
        }
      }

      setVisibleWeek(week)
    },
    [currentWeekNumber, scrollWeekThreshold],
  )

  return {
    visibleWeek,
    handleSessionPathLayout,
    handleWeekLayout,
    handleScroll,
  }
}

