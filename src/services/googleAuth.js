import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'
import { supabase } from './supabase/supabase'

export const signInWithGoogle = async () => {
  try {
    const redirectUrl = Linking.createURL('auth/callback')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
        queryParams: {
          prompt: 'select_account',
        },
      },
    })

    if (error) throw error

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl)

    if (result.type === 'success') {
      const url = result.url
      const fragment = url.split('#')[1]
      if (!fragment) return null

      const params = Object.fromEntries(
        fragment.split('&').map((pair) => pair.split('=')),
      )

      if (params.access_token && params.refresh_token) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: params.access_token,
          refresh_token: params.refresh_token,
        })

        if (sessionError) throw sessionError
        return true
      }
    }

    return null
  } catch (error) {
    console.error('Google Sign-In error:', error)
    throw error
  }
}
