import apiClient from '../apiClient'

export async function patchExerciseComplete(sessionExerciseId) {
  const response = await apiClient.patch('/workout-exercise-completed', {
    sessionExerciseId,
  })
  return response.data
}
