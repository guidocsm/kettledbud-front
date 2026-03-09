import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { supabase } from '@/src/services/supabase/supabase'
import { getProfile } from '@/src/services/user/getProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function Home() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getProfile()
      const session = await supabase.auth.getSession()

      try {
        setUserInfo({ ...userInfo, email: session.data.session.user.email })
      } catch (error) {
        console.log('error fetching user info', error)
      }
    }
    fetchUserInfo()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    await AsyncStorage.removeItem('userInfo')
    await AsyncStorage.removeItem('previewPlan')
    await AsyncStorage.removeItem('previewPlanId')
    router.replace(ROUTES_NAMES.INIT)
  }

  if (!userInfo) {
    return null
  }

  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      <CustomText color={colors.main} text={`Email: ${userInfo?.email}`} />
      <CustomText color={colors.main} text={`Gender: ${userInfo?.gender}`} />
      <CustomText
        color={colors.main}
        text={`Birth Date: ${userInfo?.birthDate}`}
      />
      <CustomText color={colors.main} text={`Weight: ${userInfo?.weight}`} />
      <CustomText color={colors.main} text={`Height: ${userInfo?.height}`} />
      <CustomText color={colors.main} text={`Goal: ${userInfo?.goal}`} />
      <CustomText
        color={colors.main}
        text={`Days Per Week: ${userInfo?.daysPerWeek}`}
      />
      <CustomText
        color={colors.main}
        text={`Time Per Session: ${userInfo?.timePerSession}`}
      />
      <CustomText
        color={colors.main}
        text={`Experience: ${userInfo?.experience}`}
      />
      <Button text="Salir" onPress={handleLogout} />
    </View>
  )
}
