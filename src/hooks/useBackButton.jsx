import { useRouter } from 'expo-router'

export function useBackButton(route = '') {
  const router = useRouter()

  const handleBackPress = () => {
    if (route) {
      router.push(route)
      return
    }

    router.back()
  }

  return { handleBackPress }
}
