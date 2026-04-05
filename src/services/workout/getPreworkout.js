import apiClient from '../apiClient'

export async function getPreworkout(sessionId) {
  const response = await apiClient.get(`/workout?sessionId=${sessionId}`)
  return response.data
}
