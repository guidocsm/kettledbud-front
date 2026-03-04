import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, View } from 'react-native'

import { BackButton } from '@/src/components/BackButton'
import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { colors } from '@/src/constants/theme'
import { renderTranslation } from '@/src/i18n/translationComponents'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

export default function OnboardingBridgeScreen() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <TypewriterBubble arrowDirection="bottom">
          <CustomText
            fontWeight={400}
            fontSize={16}
            color={colors.dark}
          >
            {renderTranslation(t('ONBOARDING.BRIDGE.DESCRIPTION'))}
          </CustomText>
        </TypewriterBubble>
        <Image
          source={require('../../../../assets/images/kettlebud-logo.png')}
          style={styles.mascot}
          resizeMode="contain"
          width={182}
          height={117}
        />
      </View>
      <Button
        text={t('COMMON.CONTINUE')}
        onPress={() => router.push(ROUTES_NAMES.GENDER)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})