import { getRedirectUrl, supabase } from './supabase'

export const sendMagicLink = async (email) => {
  console.log('Sending magic link to email:', email)
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: getRedirectUrl(),
    },
  })

  if (error) throw error
  return true
}
