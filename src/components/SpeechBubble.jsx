import { Children, cloneElement, useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../constants/theme'

const ARROW_SIZE = 12
const BORDER_WIDTH = 1
export const LINE_HEIGHT = 22
export const PARAGRAPH_GAP = 15

function makeTriangleStyle(direction, size, color) {
  const base = { width: 0, height: 0 }
  const t = 'transparent'
  switch (direction) {
    case 'down':
      return { ...base, borderLeftWidth: size, borderRightWidth: size, borderTopWidth: size, borderLeftColor: t, borderRightColor: t, borderTopColor: color }
    case 'up':
      return { ...base, borderLeftWidth: size, borderRightWidth: size, borderBottomWidth: size, borderLeftColor: t, borderRightColor: t, borderBottomColor: color }
    case 'left':
      return { ...base, borderTopWidth: size, borderBottomWidth: size, borderRightWidth: size, borderTopColor: t, borderBottomColor: t, borderRightColor: color }
    case 'right':
      return { ...base, borderTopWidth: size, borderBottomWidth: size, borderLeftWidth: size, borderTopColor: t, borderBottomColor: t, borderLeftColor: color }
    default:
      return base
  }
}

function ArrowTriangle({ direction }) {
  const isVertical = direction === 'up' || direction === 'down'
  const outerSize = ARROW_SIZE + BORDER_WIDTH

  const containerStyle = {
    alignItems: 'center',
    alignSelf: 'center',
    ...(!isVertical && { flexDirection: 'row' }),
    ...(direction === 'down' && { marginTop: -BORDER_WIDTH }),
    ...(direction === 'up' && { marginBottom: -BORDER_WIDTH }),
    ...(direction === 'left' && { marginRight: -BORDER_WIDTH }),
    ...(direction === 'right' && { marginLeft: -BORDER_WIDTH }),
  }

  const innerOffset = isVertical
    ? { marginTop: -outerSize }
    : { marginLeft: -outerSize }

  return (
    <View style={containerStyle}>
      <View style={makeTriangleStyle(direction, outerSize, colors.main)} />
      <View style={[makeTriangleStyle(direction, ARROW_SIZE, colors.white), innerOffset]} />
    </View>
  )
}

function getTextLength(node) {
  if (typeof node === 'string') return node.length
  if (typeof node === 'number') return String(node).length
  if (!node || typeof node === 'boolean') return 0
  if (Array.isArray(node)) {
    return node.reduce((sum, c) => sum + getTextLength(c), 0)
  }
  if (node.props) {
    if (node.props.children != null) return getTextLength(node.props.children)
    if (typeof node.props.text === 'string') return node.props.text.length
  }
  return 0
}

function truncateNode(node, maxChars) {
  if (maxChars <= 0) return null
  if (typeof node === 'string') return node.slice(0, maxChars)
  if (typeof node === 'number') return String(node).slice(0, maxChars)
  if (!node || typeof node === 'boolean') return null
  if (Array.isArray(node)) {
    const result = []
    let remaining = maxChars
    for (const child of node) {
      if (remaining <= 0) break
      const truncated = truncateNode(child, remaining)
      if (truncated != null) result.push(truncated)
      remaining -= getTextLength(child)
    }
    return result
  }
  if (node.props) {
    const { children: c, text: t } = node.props
    if (c != null) {
      const truncated = truncateNode(c, maxChars)
      if (truncated == null) return null
      const args = Array.isArray(truncated) ? truncated : [truncated]
      return cloneElement(node, {}, ...args)
    }
    if (typeof t === 'string') {
      return cloneElement(node, { text: t.slice(0, maxChars) })
    }
  }
  return node
}

function applyDefaults(child, defaults) {
  if (!child?.props) return child
  const inject = {}
  for (const [key, value] of Object.entries(defaults)) {
    if (child.props[key] === undefined) inject[key] = value
  }
  return Object.keys(inject).length > 0 ? cloneElement(child, inject) : child
}

export function SpeechBubble({
  children,
  arrowDirection = 'down',
  animated = true,
  animationDuration = 2,
  fontWeight = 400,
  fontSize = 14,
  width,
  height,
  onAnimationEnd,
}) {
  const childArray = Children.toArray(children)
  const styledChildren = childArray.map(child =>
    applyDefaults(child, { fontSize, fontWeight, lineHeight: LINE_HEIGHT })
  )

  const totalLength = childArray.reduce((sum, c) => sum + getTextLength(c), 0)
  const [displayedLength, setDisplayedLength] = useState(animated ? 0 : totalLength)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!animated || totalLength === 0) {
      setDisplayedLength(totalLength)
      return
    }
    setDisplayedLength(0)
    const intervalMs = (animationDuration * 1000) / totalLength
    let current = 0
    animationRef.current = setInterval(() => {
      current += 1
      setDisplayedLength(current)
      if (current >= totalLength) {
        clearInterval(animationRef.current)
        onAnimationEnd?.()
      }
    }, intervalMs)
    return () => clearInterval(animationRef.current)
  }, [totalLength, animated, animationDuration])

  const renderContent = () => {
    let remaining = displayedLength
    const visible = []
    for (const child of styledChildren) {
      if (remaining <= 0) break
      visible.push(truncateNode(child, remaining))
      remaining -= getTextLength(child)
    }

    return (
      <>
        {visible.map((child, i) => (
          <View key={i} style={i < visible.length - 1 ? styles.paragraphWithGap : undefined}>
            {child}
          </View>
        ))}
        {animated && displayedLength < totalLength && (
          <View style={styles.hiddenText} pointerEvents="none">
            {styledChildren.map((child, i) => (
              <View key={i} style={i < styledChildren.length - 1 ? styles.paragraphWithGap : undefined}>
                {cloneElement(child, { extraStyle: { opacity: 0 } })}
              </View>
            ))}
          </View>
        )}
      </>
    )
  }

  return (
    <View style={[styles.wrapper, width != null && { alignSelf: 'auto' }]}>
      {arrowDirection === 'up' && <ArrowTriangle direction="up" />}

      <View style={styles.bubbleRow}>
        {arrowDirection === 'left' && <ArrowTriangle direction="left" />}
        <View style={[styles.bubble, width != null && { flex: 0, width }, height != null && { height }]}>
          <View style={styles.textBlock}>{renderContent()}</View>
        </View>
        {arrowDirection === 'right' && <ArrowTriangle direction="right" />}
      </View>

      {arrowDirection === 'down' && <ArrowTriangle direction="down" />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubble: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.main,
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'relative',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  textBlock: {
    position: 'relative',
  },
  paragraphWithGap: {
    marginBottom: PARAGRAPH_GAP,
  },
  hiddenText: {
    position: 'absolute',
    top: 16,
    left: 20,
    right: 20,
  },
})

