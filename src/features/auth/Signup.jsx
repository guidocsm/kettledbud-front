import { GoogleIcon } from '@/assets/Icons'
import { Button, BUTTON_TYPES } from '@/src/components/Button'
import { CustomModal } from '@/src/components/CustomModal'
import CustomText from '@/src/components/CustomText'
import { FormField } from '@/src/components/FormField'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { signInWithGoogle } from '@/src/services/googleAuth'
import { flushOnboardingData } from '@/src/services/onboarding/flushOnboardingData'
import { saveUserPlan } from '@/src/services/onboarding/saveUserPlan'
import { sendMagicLink } from '@/src/services/supabase/magicLinkAuth'
import { supabase } from '@/src/services/supabase/supabase'
import { signUpValidations } from '@/validations/auth/signUpValidations'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function SignUp({ visible = false, onClose, onSentEmail }) {
  const { t } = useTranslation()
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const router = useRouter()

  const onSubmit = async (values) => {
    setIsSendingEmail(true)
    await sendMagicLink(values.email)
    setIsSendingEmail(false)
    onSentEmail()
  }

  const onSignInWithGoogle = async () => {
    try {
      const data = await signInWithGoogle()
      if (data) {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        const {
          data: { session },
        } = await supabase.auth.getSession()
        await flushOnboardingData()
        await saveUserPlan()
        router.replace(ROUTES_NAMES.HOME)
        AsyncStorage.removeItem('previewPlan')
      }
    } catch (err) {
      console.log('error', err)
    }
  }

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
              text={t('AUTH.SIGNUP.ONBOARDING.TITLE')}
              fontSize={20}
              fontWeight={600}
              color={colors.white}
              extraStyle={styles.title}
            />
            <CustomText
              text={t('AUTH.SIGNUP.ONBOARDING.DESCRIPTION')}
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
                    isSendingEmail ? BUTTON_TYPES.DISABLED : BUTTON_TYPES.MAIN
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
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <CustomText
              text={t('COMMON.CLOSE')}
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
})
