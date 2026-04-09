import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

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
      <Mascot style={{ width: 200, height: 163 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  kettlebudContainer: {
    alignItems: 'center',
    gap: 20,
  },
})
