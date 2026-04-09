import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import { colors } from '@/src/constants/theme'

/**
 * @param {object} props
 * @param {string[]} props.tips - Array of tip strings
 */
export default function ExerciseTips({ tips }) {
  if (!tips || tips.length === 0) return null

  return (
    <View style={styles.container}>
      <Mascot style={styles.mascot} />
      <View style={styles.tipsList}>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipRow}>
            <View style={styles.bullet} />
            <CustomText
              text={tip}
              fontWeight={500}
              fontSize={14}
              color={colors.whiteLight}
              extraStyle={styles.tipText}
            />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  mascot: {
    width: 67,
    height: 46,
  },
  tipsList: {
    gap: 6,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingRight: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.main,
    marginTop: 5,
  },
  tipText: {
    flex: 1,
  },
})
