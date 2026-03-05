import { 
  HeartIcon, 
  BurnIcon, 
  DumbbellIcon,
  SeedIcon,
  CycleIcon,
  MuscleIcon,
  ThunderIcon,
  ClockIcon,
  MaleIcon,
  FemaleIcon,
  LineIcon,
} from '@/assets/Icons'

export const STEP_CONFIG = [
  {
    slug: 'goal',
    speech: '¿Qué te gustaría conseguir?',
  },
  {
    slug: 'experience',
    speech: '¿Cuál es tu experiencia en el gym?',
  },
  {
    slug: 'daysPerWeek',
    speech: '¿Cuántos días a la semana quieres entrenar?',
  },
  {
    slug: 'timePerSession',
    speech: '¿Cuánto tiempo tienes para entrenar?',
  },
  {
    slug: 'gender',
    speech: '¿Cómo te identificas?',
  },
  {
    slug: 'birthDate',
    speech: '¿Cuándo es tu cumpleaños?',
  },
  {
    slug: 'bodyMetrics',
    speech: '¿Cuánto mides y cuánto pesas?',
  },
  {
    slug: 'injuries',
    speech: '¿Tienes alguna lesión o molestia?',
  },
]

export const TOTAL_STEPS = STEP_CONFIG.length

export const GOALS_STEP = {
  ICONS: {
    feel_better: HeartIcon,
    lose_fat: BurnIcon,
    gain_muscle: DumbbellIcon,
  },
}

export const EXPERIENCE_STEP = {
  ICONS: {
    new: SeedIcon,
    returning: CycleIcon,
    active: MuscleIcon,
  },
  KEYS: {
    NEW: 'new',
    RETURNING: 'returning',
    ACTIVE: 'active',
  }
}

export const TIME_PER_WORKOUT_STEP = {
  ICONS: {
    45: ThunderIcon,
    60: BurnIcon,
    80: ClockIcon,
  },
}

export const GENDER_STEP = {
  ICONS: {
    M: MaleIcon,
    F: FemaleIcon,
    prefer_not_to_say: LineIcon,
  },
}

export const GOALS_KEYS = {
  'feel_better': 'FEEL_BETTER',
  'lose_fat': 'LOSE_FAT',
  'gain_muscle': 'GAIN_MUSCLE',
}
