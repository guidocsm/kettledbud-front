import { Image, StyleSheet, View } from 'react-native'
import { Trans, useTranslation } from 'react-i18next'
import { BackButton } from '@/src/components/BackButton'
import { SpeechBubble } from '@/src/components/SpeechBubble'
import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { translationComponents } from '@/src/i18n/translationComponents'

export function WelcomeScreen() {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <SpeechBubble
          arrowDirection="down"
          animated={true}
          animationDuration={3}
          width={283}
        >
          <CustomText>
            <Trans
              i18nKey="WELCOME.GREETING"
              components={translationComponents}
            />
          </CustomText>
          <CustomText>
            {t('WELCOME.DESCRIPTION')}
          </CustomText>
          <CustomText>
            {t('WELCOME.DURATION')}
          </CustomText>
        </SpeechBubble>
        <Image
          source={require('../../../assets/images/kettlebud-logo.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      </View>
      <Button
        text={t('COMMON.GO')}
        onPress={() => console.log('Continuar presionado')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0,
  },
  mascot: {
    width: 180,
    height: 180,
    marginTop: -10,
  },
})
