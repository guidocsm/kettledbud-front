import { Button } from '@/src/components/Button'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { supabase } from '@/src/services/supabase/supabase'
import { View } from 'react-native'

export default function home() {
  return (
    <View>
      <CustomText color={colors.main} text="Home" />
      <Button text="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  )
}
