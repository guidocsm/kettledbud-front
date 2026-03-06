import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { supabase } from '@/src/services/supabase/supabase'
import { getProfile } from '@/src/services/user/getProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

export default function home() {
  const router = useRouter()
  const userInfo = async () => {
    const userInfo = await getProfile()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    await AsyncStorage.removeItem('userInfo')
    await AsyncStorage.removeItem('previewPlan')
    await AsyncStorage.removeItem('previewPlanId')
    router.replace(ROUTES_NAMES.INIT)
  }
  return (
    <View>
      <CustomText color={colors.main} text="Home" />
      <Button text="Sign out" onPress={handleLogout} />
      <Button text="Get user info" onPress={() => userInfo()} />
    </View>
  )
}
