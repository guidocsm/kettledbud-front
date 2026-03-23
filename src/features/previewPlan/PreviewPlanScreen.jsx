import { Button, BUTTON_TYPES } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import PageWrapper from '@/src/components/PageWrapper'
import { colors } from '@/src/constants/theme'
import { useSignIn } from '@/src/hooks/useSignIn'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import SentEmail from '../auth/SentEmail'
import SignUp from '../auth/Signup'
import { PreviewKettlebiMessage } from './components/PreviewKettlebiMessage'
import { SummaryUserPlan } from './components/SummaryUserPlan'
import { WeeklyPlan } from './components/WeeklyPlan'

export default function PreviewPlanScreen() {
  const [previewPlan, setPreviewPlan] = useState(null)
  const [userData, setUserData] = useState(null)
  const [openSignup, setOpenSignup] = useState(false)
  // const [isSentEmail, setIsSentEmail] = useState(false)

  const { t } = useTranslation()
  const router = useRouter()

  const {
    isSigningWithEmail,
    isSentEmail,
    setIsSentEmail,
    onSignInWithGoogle,
    onSignInWithEmail,
  } = useSignIn()

  useEffect(() => {
    const fetchPreviewPlan = async () => {
      const previewPlanAsync = await AsyncStorage.getItem('previewPlan')
      const userDataAsync = await AsyncStorage.getItem('userInfo')
      const previewPlanIdAsync = await AsyncStorage.getItem('previewPlanId')

      setPreviewPlan(JSON.parse(previewPlanAsync))
      setUserData(JSON.parse(userDataAsync))
    }
    fetchPreviewPlan()
  }, [])

  const handleStartAgain = async () => {
    await AsyncStorage.removeItem('previewPlan')
    await AsyncStorage.removeItem('userInfo')
    router.replace(ROUTES_NAMES.INIT)
  }

  const onSentEmail = () => {
    onSignInWithEmail(userData?.email)
  }

  return (
    <>
      <PageWrapper style={styles.container} isScrollView>
        <PreviewKettlebiMessage />
        <SummaryUserPlan
          durationWeeks={previewPlan?.durationWeeks}
          daysPerWeek={previewPlan?.daysPerWeek}
          timePerSession={previewPlan?.timePerSession}
          goal={previewPlan?.goal}
        />
        <WeeklyPlan previewPlan={previewPlan} />
        <View style={styles.buttonContainer}>
          <Button
            text={t('PREVIEW_PLAN.SAVE_PLAN')}
            onPress={() => setOpenSignup(true)}
            type={BUTTON_TYPES.MAIN}
          />
          <TouchableOpacity onPress={handleStartAgain}>
            <CustomText
              text={t('PREVIEW_PLAN.START_AGAIN')}
              color={colors.whiteLight}
              fontSize={16}
              fontWeight={600}
              extraStyle={styles.exitButton}
            />
          </TouchableOpacity>
        </View>
      </PageWrapper>
      <SignUp
        visible={openSignup}
        onClose={() => setOpenSignup(false)}
        onSentEmail={onSentEmail}
      />
      <SentEmail visible={isSentEmail} onClose={() => setIsSentEmail(false)} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingTop: 50,
  },
  buttonContainer: {
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitButton: {
    textDecorationLine: 'underline',
  },
})
