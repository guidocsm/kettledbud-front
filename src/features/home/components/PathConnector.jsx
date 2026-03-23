import { colors } from '@/src/constants/theme'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export function PathConnector({ from, to }) {
  const positions = {
    left: 40,
    center: 260 / 2,
    right: 260 - 40,
  }

  const startX = positions[from]
  const endX = positions[to]

  return (
    <View style={styles.container}>
      <Svg width={260} height={80}>
        <Path
          d={`M ${startX} 0 C ${startX} ${50}, ${endX} ${50}, ${endX} ${80}`}
          stroke={colors.gray}
          strokeWidth={2}
          strokeDasharray="6 6"
          fill="none"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
})

export default PathConnector
