import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

export default function StatsSummaryItem({
  icon,
  value,
  label,
  valueFontSize = 24,
  labelFontSize = 14,
}) {
  const formattedValue = String(value ?? '')

  return (
    <View style={styles.item}>
      <View style={styles.iconSlot}>
        <View style={styles.iconContainer}>{icon}</View>
      </View>
      <View style={styles.valueSlot}>
        <CustomText
          text={formattedValue}
          color={colors.white}
          fontWeight={700}
          fontSize={valueFontSize}
          textAlign="center"
          lineHeight={Math.ceil(valueFontSize * 1.3)}
          extraStyle={styles.valueText}
        />
      </View>
      <View style={styles.labelSlot}>
        <CustomText
          text={label}
          color={colors.whiteLight}
          fontWeight={500}
          fontSize={labelFontSize}
          textAlign="center"
          lineHeight={Math.ceil(labelFontSize * 1.35)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconSlot: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: colors.mainLight,
    borderRadius: 50,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueSlot: {
    width: '100%',
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelSlot: {
    width: '100%',
    minHeight: 48,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  valueText: {
    width: '100%',
  },
})
