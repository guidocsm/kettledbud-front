import { supabase } from '../supabase/supabase'

export const updateProfile = async (profileData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: user.id, ...profileData })
    .select()
    .single()

  if (error) throw error
  return data
}
