import React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

/**
 * @typedef {'center' | 'left' | 'right'} ConnectorPosition
 *
 * @typedef {Object} PathConnectorProps
 * @property {ConnectorPosition} from
 * @property {ConnectorPosition} to
 */

/**
 * Curved connector between two nodes in the session path.
 *
 * @param {PathConnectorProps} props
 */
export function PathConnector({ from, to }) {
  const strokeColor = '#374151'

  const width = 260
  const height = 80

  const positions = {
    left: 40,
    center: width / 2,
    right: width - 40,
  }

  const startX = positions[from]
  const endX = positions[to]

  const controlYOffset = 50

  const d = `M ${startX} 0 C ${startX} ${controlYOffset}, ${endX} ${controlYOffset}, ${endX} ${height}`

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        <Path d={d} stroke={strokeColor} strokeWidth={2} strokeDasharray="6 6" fill="none" />
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

