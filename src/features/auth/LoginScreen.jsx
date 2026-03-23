import { GoogleIcon } from '@/assets/Icons'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { FormField } from '@/src/components/FormField'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'
import { useSignIn } from '@/src/hooks/useSignIn'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { signUpValidations } from '@/validations/auth/signUpValidations'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import SentEmail from './SentEmail'

export default function LoginScreen() {
  const router = useRouter()
  const { t } = useTranslation()

  const {
    isSigningWithEmail,
    isSentEmail,
    setIsSentEmail,
    onSignInWithGoogle,
    onSignInWithEmail,
  } = useSignIn()

  const onSubmit = async (values) => {
    await onSignInWithEmail(values.email)
  }

  return (
    <PageWrapper style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/kettlebud.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleContainer}>
            <CustomText
              text="Accede a tu cuenta"
              fontSize={20}
              fontWeight={600}
              color={colors.white}
              extraStyle={styles.title}
            />
            <CustomText
              text="Y sigue construyendo tu progreso"
              fontSize={16}
              fontWeight={500}
              color={colors.whiteLight}
            />
          </View>
        </View>
        <View style={styles.form}>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={onSubmit}
            validationSchema={signUpValidations}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View style={styles.formContainer}>
                <FormField
                  label={t('COMMON.FORM.EMAIL.LABEL')}
                  placeholder={t('COMMON.FORM.EMAIL.PLACEHOLDER')}
                  name="email"
                  value={values.email}
                  keyboardType="email-address"
                />
                <Button
                  type={
                    isSigningWithEmail
                      ? BUTTON_TYPES.DISABLED
                      : BUTTON_TYPES.MAIN
                  }
                  text={t('COMMON.CONTINUE')}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <CustomText
            text={t('AUTH.OTHER_OPTIONS_LABEL')}
            fontSize={16}
            fontWeight={300}
            color={colors.white}
            extraStyle={styles.separatorText}
          />
          <View style={styles.separatorLine} />
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.googleButton} onPress={onSignInWithGoogle}>
            <GoogleIcon width={20} height={20} color={colors.dark} />
            <CustomText
              text={t('AUTH.GOOGLE.TITLE')}
              fontSize={16}
              fontWeight={600}
              color={colors.dark}
            />
          </Pressable>
        </View>
        <View style={styles.registerContainer}>
          <CustomText
            text="¿Aún no tienes cuenta?"
            fontSize={14}
            fontWeight={500}
            color={colors.whiteLight}
          />
          <TouchableOpacity
            onPress={() => router.push(ROUTES_NAMES.WELCOME)}
            style={styles.closeButton}
          >
            <CustomText
              text="Regístrate"
              fontSize={14}
              fontWeight={500}
              color={colors.whiteLight}
              extraStyle={styles.closeButtonText}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SentEmail visible={isSentEmail} onClose={() => setIsSentEmail(false)} />
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 50,
    gap: 50,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    gap: 50,
  },
  titleContainer: {
    gap: 6,
    alignItems: 'center',
  },
  mascotImage: {
    width: 180,
    height: 140,
  },
  logoImage: {
    width: 180,
    height: 30,
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
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
    // width: '100%',
  },
})
