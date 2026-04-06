import apiClient from '../apiClient'

export async function patchWorkoutSet(exerciseSetId, weight, actualReps) {
  const response = await apiClient.patch('/workout-set', {
    exerciseSetId,
    weight,
    actualReps,
  })
  return response.data
}
