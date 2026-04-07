import { create } from 'zustand'

const useRestTimerStore = create((set, get) => ({
  isActive: false,
  isVisible: false,
  isFinished: false,
  timeRemaining: 0,
  totalTime: 0,
  intervalId: null,

  startTimer: (restTime) => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)

    const id = setInterval(() => {
      const { timeRemaining } = get()
      if (timeRemaining <= 1) {
        clearInterval(get().intervalId)
        set({ timeRemaining: 0, isActive: false, isFinished: true, intervalId: null })
        return
      }
      set({ timeRemaining: timeRemaining - 1 })
    }, 1000)

    set({
      isActive: true,
      isVisible: true,
      isFinished: false,
      totalTime: restTime,
      timeRemaining: restTime,
      intervalId: id,
    })
  },

  stopTimer: () => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
    set({
      isActive: false,
      isVisible: false,
      isFinished: false,
      timeRemaining: 0,
      intervalId: null,
    })
  },

  skipTimer: () => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
    set({
      isActive: false,
      isVisible: false,
      isFinished: false,
      timeRemaining: 0,
      intervalId: null,
    })
  },

  minimizeTimer: () => {
    set({ isVisible: false })
  },

  expandTimer: () => {
    set({ isVisible: true })
  },

  dismissFinished: () => {
    set({ isFinished: false, isVisible: false })
  },
}))

export default useRestTimerStore
