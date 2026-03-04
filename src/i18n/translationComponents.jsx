import React, { cloneElement } from 'react'

import CustomText from '@/src/components/CustomText'

export const translationComponents = {
  bold: <CustomText fontWeight={700} />,
  semibold: <CustomText fontWeight={600} />,
  light: <CustomText fontWeight={300} />,
}

/**
 * Parsea un string de traducción con tags (ej: "<bold>texto</bold>")
 * y devuelve un array de strings y React elements que SpeechBubble
 * puede recorrer para el efecto typewriter.
 */
export function renderTranslation(text, components = translationComponents) {
  const tagRegex = /<(\w+)>(.*?)<\/\1>/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = tagRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const [, tagName, content] = match
    const component = components[tagName]
    if (component) {
      parts.push(cloneElement(component, { key: `t-${match.index}` }, content))
    } else {
      parts.push(content)
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}
