import { Image, StyleSheet, Text, View } from 'react-native'
import { BackButton } from '@/src/components/BackButton'
import { SpeechBubble } from '@/src/components/SpeechBubble'
import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'

export function WelcomeScreen() {
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
            Hola, soy <CustomText fontWeight={700}>Kettle</CustomText>, tu nuevo compañero de gym.
          </CustomText>
          <CustomText>
            Necesito conocerte un poco para preparar tu plan personalizado.
          </CustomText>
          <CustomText>Son solo 2 minutos.</CustomText>
        </SpeechBubble>
        <Image
          source={require('../../../assets/images/kettlebud-logo.png')}
          style={styles.mascot}
          resizeMode="contain"
        />
      </View>

      <Button
        text="Continuar"
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
