import { useState, useMemo, useCallback } from 'react'
import {
  CM_MIN,
  CM_MAX,
  CM_PER_INCH,
  TOTAL_INCHES_MIN,
  TOTAL_INCHES_MAX,
  DEFAULT_HEIGHT_CM,
  UNIT_HEIGHT_CM,
  UNIT_HEIGHT_FT,
} from '@/src/features/onboarding/bodyMetrics/utils/constants'

function clamp(value, min, max) {
  return Math.min(Math.max(Math.round(value), min), max)
}

function cmToTotalInches(cm) {
  return clamp(Math.round(cm / CM_PER_INCH), TOTAL_INCHES_MIN, TOTAL_INCHES_MAX)
}

function totalInchesToCm(totalInches) {
  return clamp(Math.round(totalInches * CM_PER_INCH), CM_MIN, CM_MAX)
}

export function useBodyHeight({ initialHeight, unit: initialUnit = UNIT_HEIGHT_CM, onHeightChange } = {}) {
  const [unit, setUnit] = useState(initialUnit)

  const resolvedInitial = useMemo(() => {
    const cm = clamp(initialHeight ?? DEFAULT_HEIGHT_CM, CM_MIN, CM_MAX)
    return { cm, totalInches: cmToTotalInches(cm) }
  }, [])

  const [cm, setCm] = useState(resolvedInitial.cm)
  const [totalInches, setTotalInches] = useState(resolvedInitial.totalInches)

  const handleCmChange = useCallback(
    (value) => {
      const num = Number(value)
      if (Number.isNaN(num)) return
      setCm(num)
      setTotalInches(cmToTotalInches(num))
      onHeightChange?.({ value: num, unit: UNIT_HEIGHT_CM })
    },
    [onHeightChange],
  )

  const handleFtInChange = useCallback(
    (value) => {
      const num = Number(value)
      if (Number.isNaN(num)) return
      setTotalInches(num)
      const newCm = totalInchesToCm(num)
      setCm(newCm)
      onHeightChange?.({ value: newCm, unit: UNIT_HEIGHT_FT })
    },
    [onHeightChange],
  )

  const switchUnit = useCallback(
    (newUnit) => {
      if (newUnit === unit) return
      if (newUnit === UNIT_HEIGHT_FT) {
        const newInches = cmToTotalInches(cm)
        setTotalInches(newInches)
        onHeightChange?.({ value: cm, unit: UNIT_HEIGHT_FT })
      } else {
        const newCm = totalInchesToCm(totalInches)
        setCm(newCm)
        onHeightChange?.({ value: newCm, unit: UNIT_HEIGHT_CM })
      }
      setUnit(newUnit)
    },
    [unit, cm, totalInches, onHeightChange],
  )

  return {
    cm,
    totalInches,
    unit,
    handleCmChange,
    handleFtInChange,
    switchUnit,
  }
}
