import { GoogleIcon } from '@/assets/Icons'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import { CustomModal } from '@/src/components/CustomModal'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useState } from 'react'
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Signup({ visible = false, onClose }) {
  const [email, setEmail] = useState('')

  return (
    <CustomModal visible={visible} onClose={onClose} transparent showBlur>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/kettlebud-logo.png')}
              style={styles.mascotImage}
              resizeMode="contain"
            />
            <Image
              source={require('@/assets/images/kettlebud.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleContainer}>
            <CustomText
              text="Un último paso"
              fontSize={20}
              fontWeight={600}
              color={colors.white}
              extraStyle={styles.title}
            />
            <CustomText
              text="Regístrate para guardar tu plan"
              fontSize={16}
              fontWeight={500}
              color={colors.whiteLight}
            />
          </View>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <CustomText
              text="Correo electrónico"
              fontSize={16}
              fontWeight={300}
              color={colors.white}
              extraStyle={styles.inputLabel}
            />
            <TextInput
              style={styles.input}
              placeholder="usuario@gmail.com"
              placeholderTextColor={colors.whiteLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <Button
            type={BUTTON_TYPES.MAIN}
            text="Continuar"
            onPress={() => {}}
          />
        </View>
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <CustomText
            text="Si lo prefieres:"
            fontSize={16}
            fontWeight={300}
            color={colors.white}
            extraStyle={styles.separatorText}
          />
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.googleButton}>
            <GoogleIcon width={20} height={20} color={colors.dark} />
            <CustomText
              text="Accede con Google"
              fontSize={16}
              fontWeight={600}
              color={colors.dark}
            />
          </Pressable>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <CustomText
              text="Cerrar"
              fontSize={14}
              fontWeight={500}
              color={colors.white}
              extraStyle={styles.closeButtonText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
    paddingVertical: 50,
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: 20,
    backgroundColor: colors.mainBackground,
    gap: 30,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    gap: 50,
  },
  logoContainer: {
    gap: 30,
    alignItems: 'center',
  },
  titleContainer: {
    gap: 6,
    alignItems: 'center',
  },
  mascotImage: {
    width: 109,
    height: 75,
  },
  logoImage: {
    width: 158,
    height: 23,
  },
  form: {
    gap: 30,
  },
  inputContainer: {
    gap: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: colors.white,
    fontSize: 16,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.whiteLight,
  },
  separatorText: {
    marginHorizontal: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 50,
    gap: 10,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    gap: 20,
  },
})
