export const BODY_METRICS_KEYS = {
  HEIGHT: 'height',
  WEIGHT: 'weight',
}

// Height
export const CM_MIN = 100
export const CM_MAX = 250
export const CM_PER_INCH = 2.54
export const TOTAL_INCHES_MIN = Math.ceil(CM_MIN / CM_PER_INCH)
export const TOTAL_INCHES_MAX = Math.floor(CM_MAX / CM_PER_INCH)

export const CM_VALUES = Array.from({ length: CM_MAX - CM_MIN + 1 }, (_, i) => CM_MIN + i)
export const FT_IN_VALUES = Array.from(
  { length: TOTAL_INCHES_MAX - TOTAL_INCHES_MIN + 1 },
  (_, i) => {
    const total = TOTAL_INCHES_MIN + i
    return {
      totalInches: total,
      label: `${Math.floor(total / 12)}'${total % 12}"`,
    }
  },
)

// Weight
export const KG_MIN = 30
export const KG_MAX = 200
export const LB_MIN = 66
export const LB_MAX = 440
export const KG_TO_LB = 2.20462
export const LB_TO_KG = 1 / KG_TO_LB

export const KG_VALUES = Array.from({ length: KG_MAX - KG_MIN + 1 }, (_, i) => KG_MIN + i)
export const LB_VALUES = Array.from({ length: LB_MAX - LB_MIN + 1 }, (_, i) => LB_MIN + i)

// Default values when no initial is provided
export const DEFAULT_HEIGHT_CM = 175
export const DEFAULT_WEIGHT_KG = 75
export const DEFAULT_WEIGHT_LB = 165

// Units (single source of truth for comparisons and labels)
export const UNIT_HEIGHT_CM = 'cm'
export const UNIT_HEIGHT_FT = 'ft'
export const UNIT_WEIGHT_KG = 'kg'
export const UNIT_WEIGHT_LB = 'lb'
