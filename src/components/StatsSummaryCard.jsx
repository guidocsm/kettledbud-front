import { Children, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '@/src/constants/theme'

export default function StatsSummaryCard({ children, style }) {
  const items = Children.toArray(children)

  return (
    <View style={[styles.container, style]}>
      {items.map((child, index) => (
        <Fragment key={index}>
          {child}
          {index < items.length - 1 ? <View style={styles.divider} /> : null}
        </Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  divider: {
    width: 1,
    backgroundColor: colors.mainLight,
  },
})
