import { Image, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { BackButton } from '@/src/components/BackButton'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { renderTranslation } from '@/src/i18n/translationComponents'
import { useRouter } from 'expo-router'
import { colors } from '@/src/constants/theme'

export function WelcomeScreen() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <TypewriterBubble
          arrowDirection="bottom"
          width={283}
        >
          <CustomText color={colors.dark}>
            {renderTranslation(t('WELCOME.GREETING'))}
          </CustomText>
          <CustomText color={colors.dark}>
            {t('WELCOME.DESCRIPTION')}
          </CustomText>
          <CustomText color={colors.dark}>
            {t('WELCOME.DURATION')}
          </CustomText>
        </TypewriterBubble>
        <Image
          source={require('../../../assets/images/kettlebud-logo.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      </View>
      <Button
        text={t('COMMON.GO')}
        onPress={() => router.push('/onboarding/goal')}
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
