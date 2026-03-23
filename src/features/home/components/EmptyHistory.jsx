import { StyleSheet, View } from 'react-native'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'

/**
 * Empty state shown when there is no history yet.
 */
export function EmptyHistory() {
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.gradientLineWrapper}>
        <Svg width={1} height={250}>
          <Defs>
            <LinearGradient id="fadeLine" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.main} stopOpacity="1" />
              <Stop offset="1" stopColor={colors.main} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="1" height={250} fill="url(#fadeLine)" />
        </Svg>
      </View>
      <View style={styles.container}>
        <CustomText
          text={t('HOME.EMPTY_HISTORY_MESSAGE')}
          fontWeight={400}
          fontSize={14}
          color={colors.whiteLight}
          textAlign="center"
          lineHeight={20}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    marginTop: 40,
    alignItems: 'center',
  },
  gradientLineWrapper: {
    alignItems: 'center',
  },
})

export default EmptyHistory
