import { colors } from '@/src/constants/theme'
import { StyleSheet, View } from 'react-native'
import CustomText from '../CustomText'

export function Tab({ Icon, focused, label }) {
  const color = focused ? colors.main : colors.whiteLight

  return (
    <View style={styles.tabItem}>
      <Icon color={color} width={24} height={24} />
      <CustomText
        fontWeight={focused ? 700 : 600}
        fontSize={14}
        color={color}
        text={label}
        extraStyle={styles.tabLabel}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  tabLabel: {
    textAlign: 'center',
    marginTop: 4,
  },
})
