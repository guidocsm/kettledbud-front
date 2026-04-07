import { create } from 'zustand'

import { WORKOUT_STATUS } from '@/src/features/workout/utils/constants'

const initialState = {
  sessionId: null,
  status: null,
  routineName: null,
  muscleGroup: null,
  restTime: null,
  exercises: [],
  completedSets: 0,
  totalSets: 0,
  currentExerciseId: null,
}

const useWorkoutStore = create((set, get) => ({
  ...initialState,

  workoutProgress: () => {
    const { completedSets, totalSets } = get()
    if (totalSets === 0) return 0
    return completedSets / totalSets
  },

  initWorkout: (workoutData) => {
    const totalSets = workoutData.exercises.reduce(
      (sum, ex) => sum + ex.sets,
      0,
    )

    const completedSets = workoutData.exercises
      .filter((ex) => ex.status === WORKOUT_STATUS.COMPLETED)
      .reduce((sum, ex) => sum + ex.sets, 0)

    set({
      sessionId: workoutData.sessionId,
      status: workoutData.status,
      routineName: workoutData.routineName,
      muscleGroup: workoutData.muscleGroup,
      restTime: workoutData.restTime,
      exercises: workoutData.exercises,
      totalSets,
      completedSets,
    })
  },

  updateExerciseStatus: (exerciseId, newStatus) => {
    const { exercises } = get()
    set({
      exercises: exercises.map((ex) =>
        ex.exerciseId === exerciseId ? { ...ex, status: newStatus } : ex,
      ),
    })
  },

  incrementCompletedSets: () => {
    set((state) => ({ completedSets: state.completedSets + 1 }))
  },

  setCurrentExerciseId: (exerciseId) => {
    set({ currentExerciseId: exerciseId })
  },

  updateRestTime: (newRestTime) => {
    set({ restTime: newRestTime })
  },

  updateSessionStatus: (newStatus) => {
    set({ status: newStatus })
  },

  resetWorkout: () => {
    set(initialState)
  },
}))

export default useWorkoutStore
