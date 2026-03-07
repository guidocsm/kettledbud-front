import { CustomModal } from '@/src/components/CustomModal'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function SentEmail({ visible = false, onClose }) {
  const { t } = useTranslation()

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
              text="Revisa tu correo electrónico"
              fontSize={20}
              fontWeight={600}
              color={colors.white}
              extraStyle={styles.title}
            />
            <CustomText
              text="Te hemos enviado un enlace de acceso. Haz clic en el enlace para acceder"
              fontSize={16}
              fontWeight={500}
              textAlign="center"
              color={colors.whiteLight}
            />
          </View>
          <View style={styles.footer}>
            <CustomText
              text="Si no encuentras el enlace, revisa la carpeta de spam o correos no deseados."
              fontSize={14}
              // fontWeight={400}
              color={colors.whiteLight}
              extraStyle={styles.title}
              textAlign="center"
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CustomText
                text={t('COMMON.CLOSE')}
                fontSize={14}
                fontWeight={500}
                color={colors.white}
                extraStyle={styles.closeButtonText}
                textAlign="center"
              />
            </TouchableOpacity>
          </View>
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
  formContainer: {
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
  footer: {
    gap: 30,
    alignItems: 'center',
    width: '100%',
  },
})
