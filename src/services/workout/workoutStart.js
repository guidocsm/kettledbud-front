import apiClient from '../apiClient'

export async function postWorkoutStart(sessionId, restTime) {
  const response = await apiClient.post('/workout-start', { sessionId, restTime })
  return response.data
}
