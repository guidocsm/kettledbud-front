import CustomText from '@/src/components/CustomText'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, View } from 'react-native'

export function PreviewKettlebiMessage() {
  const { t } = useTranslation()

  return (
    <View style={styles.kettlebudContainer}>
      <TypewriterBubble arrowDirection="bottom" width={300}>
        <CustomText fontWeight={600}>
          {t('PREVIEW_PLAN.SETTLED_PLAN')}
        </CustomText>
        <CustomText fontWeight={600}>
          {t('PREVIEW_PLAN.DESCRIPTION')}
        </CustomText>
      </TypewriterBubble>
      <Image
        source={require('@/assets/images/kettlebud-logo.png')}
        style={{ width: 200, height: 163 }}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  kettlebudContainer: {
    alignItems: 'center',
    gap: 20,
  },
})
