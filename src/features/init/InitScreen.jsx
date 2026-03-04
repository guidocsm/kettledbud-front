import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, View } from 'react-native'

import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import PageWrapper from '@/src/components/PageWrapper'

function InitScreen() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <PageWrapper style={styles.container}>
      <Image
        source={require('@/assets/images/kettlebud-logo.png')}
      />
      <Image
        source={require('@/assets/images/kettlebud.png')}
      />
      <CustomText
        text={t('INIT.SUBTITLE')}
        lineHeight={26}
        color={colors.whiteLight}
        textAlign="center"
        fontWeight={500}
      />
      <View style={styles.buttonContainer}>
        <Button
          text={t('COMMON.GO')}
          onPress={() => router.push(ROUTES_NAMES.WELCOME)}
          style={styles.button}
        />
        <Button
          text="Ya tengo cuenta"
          onPress={() => { }}
          textColor={colors.main}
          style={styles.button}
          type="outline"
        />
      </View>
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
})

export default InitScreen