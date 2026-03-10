import { BurnIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { ROUTES_NAMES } from '@/src/routes/routesNames'
import apiClient from '@/src/services/apiClient'
import { supabase } from '@/src/services/supabase/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const fetchWeeklyStatus = async () => {
      try {
        const response = await apiClient.get('/weekly-status')
        console.log('weekly-status:', response)
      } catch (error) {
        console.log('error fetching weekly status', error)
      }
    }
    fetchWeeklyStatus()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    await AsyncStorage.removeItem('userInfo')
    await AsyncStorage.removeItem('previewPlan')
    await AsyncStorage.removeItem('previewPlanId')
    router.replace(ROUTES_NAMES.INIT)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.weekTextWrapper}>
          <CustomText
            fontWeight={700}
            fontSize={16}
            text="Semana 1 de 12"
            color={colors.whiteLight}
            extraStyle={styles.weekText}
          />
        </View>
        <View style={styles.streakContainer}>
          <BurnIcon width={24} height={24} color={colors.main} />
          <CustomText
            fontWeight={800}
            fontSize={20}
            text="0"
            color={colors.white}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBackground,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    width: '100%',
  },
  weekTextWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  streakContainer: {
    backgroundColor: '#252525',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    gap: 10,
  },
})
