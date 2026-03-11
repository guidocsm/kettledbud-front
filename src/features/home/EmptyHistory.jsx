import React from 'react'
import { StyleSheet, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'

/**
 * Empty state shown when there is no history yet.
 */
export function EmptyHistory() {
  const { t } = useTranslation()

  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    marginTop: 40,
    alignItems: 'center',
  },
})

export default EmptyHistory

