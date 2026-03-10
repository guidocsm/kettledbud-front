import { supabase } from '../supabase/supabase'

export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('No authenticated user')

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (error) throw error
  return data
}
