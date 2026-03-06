import { useCallback, useMemo, useState } from 'react'

const currentYear = new Date().getFullYear()

/** Fecha por defecto: exactamente 16 años antes de hoy (edad mínima 16) */
export function getDefaultBirthDate() {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 16)
  return date
}

/** Indica si la fecha de nacimiento corresponde a una persona que ya cumplió 16 años */
export function isAtLeast16(birthDate) {
  if (!birthDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const sixteenth = new Date(birthDate)
  sixteenth.setFullYear(sixteenth.getFullYear() + 16)
  sixteenth.setHours(0, 0, 0, 0)
  return today.getTime() >= sixteenth.getTime()
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

function buildDate(day, month, year) {
  const d = Number(day)
  const m = Number(month)
  const y = Number(year)
  if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) return null
  const maxDay = getDaysInMonth(y, m)
  const safeDay = Math.min(d, maxDay)
  const date = new Date(y, m - 1, safeDay)
  return Number.isNaN(date.getTime()) ? null : date
}

function parseInitialDate(value) {
  if (value == null || value === '') return null
  const date = typeof value === 'string' ? new Date(value) : value
  return Number.isNaN(date.getTime()) ? null : date
}

export function useBirthdayDate({
  initialDate: initialDateProp,
  onDateChange,
} = {}) {
  const resolvedInitial = useMemo(() => {
    const parsed = parseInitialDate(initialDateProp)
    return parsed ?? getDefaultBirthDate()
  }, [initialDateProp])

  const [day, setDay] = useState(resolvedInitial.getDate())
  const [month, setMonth] = useState(resolvedInitial.getMonth() + 1)
  const [year, setYear] = useState(resolvedInitial.getFullYear())

  const maxDay = useMemo(() => getDaysInMonth(year, month), [year, month])
  const safeDay = Math.min(day, maxDay)

  const persistDate = useCallback(
    (d, m, y) => {
      const date = buildDate(d, m, y)
      if (date) onDateChange?.(date)
    },
    [onDateChange],
  )

  const handleDayChange = useCallback(
    (value) => {
      const newDay = Number(value)
      if (Number.isNaN(newDay)) return
      setDay(newDay)
      persistDate(newDay, month, year)
    },
    [month, year, persistDate],
  )

  const handleMonthChange = useCallback(
    (value) => {
      const newMonth = Number(value)
      if (Number.isNaN(newMonth)) return
      setMonth(newMonth)
      const newMaxDay = getDaysInMonth(year, newMonth)
      const safeDayForMonth = Math.min(day, newMaxDay)
      setDay(safeDayForMonth)
      persistDate(safeDayForMonth, newMonth, year)
    },
    [day, year, persistDate],
  )

  const handleYearChange = useCallback(
    (value) => {
      const newYear = Number(value)
      if (Number.isNaN(newYear)) return
      setYear(newYear)
      const newMaxDay = getDaysInMonth(newYear, month)
      const safeDayForYear = Math.min(day, newMaxDay)
      setDay(safeDayForYear)
      persistDate(safeDayForYear, month, newYear)
    },
    [day, month, persistDate],
  )

  return {
    day,
    month,
    year,
    safeDay,
    maxDay,
    handleDayChange,
    handleMonthChange,
    handleYearChange,
  }
}
