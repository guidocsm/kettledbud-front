import { useState, useMemo, useCallback } from 'react'

import {
  KG_MIN,
  KG_MAX,
  LB_MIN,
  LB_MAX,
  KG_TO_LB,
  LB_TO_KG,
  KG_VALUES,
  LB_VALUES,
  DEFAULT_WEIGHT_KG,
  DEFAULT_WEIGHT_LB,
  UNIT_WEIGHT_KG,
  UNIT_WEIGHT_LB,
} from '@/src/features/onboarding/bodyMetrics/utils/constants'

function clamp(value, min, max) {
  return Math.min(Math.max(Math.round(value), min), max)
}

export function useBodyWeight({ initialWeight, unit: initialUnit = UNIT_WEIGHT_KG, onWeightChange } = {}) {
  const [unit, setUnit] = useState(initialUnit)

  const resolvedInitial = useMemo(() => {
    if (initialWeight == null) return initialUnit === UNIT_WEIGHT_KG ? DEFAULT_WEIGHT_KG : DEFAULT_WEIGHT_LB
    return initialUnit === UNIT_WEIGHT_KG
      ? clamp(initialWeight, KG_MIN, KG_MAX)
      : clamp(initialWeight, LB_MIN, LB_MAX)
  }, [initialWeight, initialUnit])

  const [weight, setWeight] = useState(resolvedInitial)

  const values = unit === UNIT_WEIGHT_KG ? KG_VALUES : LB_VALUES

  const handleValueChange = useCallback(
    (value) => {
      const num = Number(value)
      if (Number.isNaN(num)) return
      setWeight(num)
      onWeightChange?.({ value: num, unit })
    },
    [unit, onWeightChange],
  )

  const switchUnit = useCallback(
    (newUnit) => {
      if (newUnit === unit) return
      const converted =
        newUnit === UNIT_WEIGHT_LB
          ? clamp(weight * KG_TO_LB, LB_MIN, LB_MAX)
          : clamp(weight * LB_TO_KG, KG_MIN, KG_MAX)
      setUnit(newUnit)
      setWeight(converted)
      onWeightChange?.({ value: converted, unit: newUnit })
    },
    [unit, weight, onWeightChange],
  )

  return {
    weight,
    unit,
    values,
    handleValueChange,
    switchUnit,
  }
}
