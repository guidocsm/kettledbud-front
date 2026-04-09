export const formatVolume = (kg = 0) => {
  const numericKg = Number(kg) || 0
  return `${numericKg.toLocaleString('es-ES')} kg`
}
