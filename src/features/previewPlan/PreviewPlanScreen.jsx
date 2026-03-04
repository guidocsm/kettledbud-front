import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { useTranslation } from 'react-i18next'
import { GOALS_KEYS } from '../onboarding/utils/constants'
import { PreviewKettlebiMessage } from './components/PreviewKettlebiMessage'
import { SummaryUserPlan } from './components/SummaryUserPlan'
import { WeeklyPlan } from './components/WeeklyPlan'
import { Button, BUTTON_TYPES } from '@/src/components/Button'

export default function PreviewPlanScreen() {
  const [previewPlan, setPreviewPlan] = useState(null)
  const [userData, setUserData] = useState(null)

  const { t } = useTranslation()
  useEffect(() => {
    const fetchPreviewPlan = async () => {
      const previewPlanAsync = await AsyncStorage.getItem('previewPlan')
      const userDataAsync = await AsyncStorage.getItem('userInfo')
      setPreviewPlan(JSON.parse(previewPlanAsync))
      setUserData(JSON.parse(userDataAsync))
    }
    fetchPreviewPlan()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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
          text="Guardar mi plan"
          onPress={() => console.log('Guardar mi plan')}
          type={BUTTON_TYPES.MAIN}
        />
        <CustomText
          text="Salir"
          color={colors.whiteLight}
          fontSize={16}
          fontWeight={600}
          extraStyle={styles.exitButton}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 50
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