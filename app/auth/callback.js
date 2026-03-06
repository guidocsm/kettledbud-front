import { ROUTES_NAMES } from '@/src/routes/routesNames'
import { supabase } from '@/src/services/supabase/supabase'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const url = await Linking.getInitialURL()
        console.log('Full URL:', url)
        if (!url) return

        const fragment = url.split('#')[1]
        if (!fragment) return

        const params = Object.fromEntries(
          fragment.split('&').map((pair) => pair.split('=')),
        )

        if (params.access_token && params.refresh_token) {
          const { data, error } = await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          })

          console.log(
            'setSession result:',
            JSON.stringify({ data, error }, null, 2),
          )

          if (error) throw error
        }

        // Verifica si la sesión quedó guardada
        const {
          data: { session },
        } = await supabase.auth.getSession()
        console.log('Session after set:', session ? 'ACTIVA' : 'NULL')

        if (session) {
          router.replace(ROUTES_NAMES.HOME)
        } else {
          router.replace(ROUTES_NAMES.PREVIEW_PLAN)
        }
      } catch (err) {
        console.error('Auth callback error:', JSON.stringify(err))
        router.replace(ROUTES_NAMES.PREVIEW_PLAN)
      }
    }

    handleCallback()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18181B',
      }}
    >
      <ActivityIndicator size="large" color="#F59E0B" />
    </View>
  )
}
