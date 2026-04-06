import apiClient from '../apiClient'

export async function getExerciseDetail(sessionId, exerciseId) {
  const response = await apiClient.get(
    `/workout-exercise?sessionId=${sessionId}&exerciseId=${exerciseId}`,
  )
  return response.data
}
