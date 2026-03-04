import { fonts, fontWeights } from './theme'

export function getFontFamily(fontKey, weight) {
  const family = fonts[fontKey]
  
  if (!family) return fonts.nunito[400]
  
  const weightValue = fontWeights.includes(weight) ? weight : 400
  return family[weightValue] ?? family[400]
}