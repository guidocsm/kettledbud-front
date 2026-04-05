import { StyleSheet, View } from 'react-native'

import { colors } from '@/src/constants/theme'

/**
 * @param {object} props
 * @param {number} props.progress - Value between 0 and 1
 */
export default function ProgressBar({ progress = 0 }) {
  const clampedProgress = Math.max(0, Math.min(progress, 1))

  return (
    <View style={styles.track}>
      {clampedProgress > 0 && (
        <View style={[styles.fill, { width: `${clampedProgress * 100}%` }]} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    backgroundColor: colors.gray,
    borderRadius: 50,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.main,
    borderRadius: 2,
  },
})
