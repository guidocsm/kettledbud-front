import { Image, StyleSheet, View } from "react-native"
import CustomText from "@/src/components/CustomText"
import { colors } from "@/src/constants/theme"
import { Button } from "@/src/components/Button"
import { useRouter } from "expo-router"

function InitScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/kettlebud-logo.png')}
      />
      <Image
        source={require('../../../assets/images/kettlebud.png')}
      />
      <CustomText
        text="La forma gratuita, divertida y efectiva de crear hábitos y un estilo de vida mejor."
        lineHeight={26}
        color={colors.darkLight}
        textAlign="center"
        fontWeight={500}
      />
      <View style={styles.buttonContainer}>
        <Button
          text="Empecemos"
          onPress={() => router.push('/welcome')}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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