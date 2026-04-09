export const formatElapsedTime = (elapsedMs) => {
  const safeElapsedMs = Math.max(0, elapsedMs)
  const totalSeconds = Math.floor(safeElapsedMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours >= 1) {
    return `${hours}h ${minutes}min`
  }

  if (minutes >= 1) {
    return `${minutes}min ${seconds}s`
  }

  return `${seconds}s`
}

export const formatDurationMinutes = (minutesInput = 0) => {
  const totalMinutes = Math.max(0, Math.floor(Number(minutesInput) || 0))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours >= 1) {
    return `${hours}h ${minutes}min`
  }

  return `${minutes} min`
}
