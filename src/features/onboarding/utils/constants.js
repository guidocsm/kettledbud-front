import { 
  HeartIcon, 
  BurnIcon, 
  DumbbellIcon,
  SeedIcon,
  CycleIcon,
  MuscleIcon,
  ThunderIcon,
  ClockIcon,
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
    slug: 'workoutPerWeek',
    speech: '¿Cuántos días a la semana quieres entrenar?',
  },
  {
    slug: 'timePerWorkout',
    speech: '¿Cuánto tiempo tienes para entrenar?',
  },
  {
    slug: 'level',
    speech: '¿Cómo te identificas?',
  },
  {
    slug: 'preferences',
    speech: '¿Cuándo es tu cumpleaños?',
  },
  {
    slug: 'summary',
    speech: '¿Cuánto mides y cuánto pesas?',
  },
  {
    slug: 'summary',
    speech: '¿Tienes alguna lesión o molestia?',
  },
]
export const TOTAL_STEPS = STEP_CONFIG.length

export const ONBOARDING = {
  GOAL: [
    {
      title: 'Sentirme mejor',
      description: 'Más energía, más salud, mejores hábitos',
      icon: HeartIcon,
      slug: 'feeling_better',
    },
    {
      title: 'Perder grasa',
      description: 'Definir mi cuerpo y bajar de peso',
      icon: BurnIcon,
      slug: 'losing_fat',
    },
    {
      title: 'Ganar músculo',
      description: 'Verme más grande y sentirme más fuerte',
      icon: DumbbellIcon,
      slug: 'gaining_muscle',
    },
  ],
  EXPERIENCE: [
    {
      title: 'Soy nuevo',
      description: 'Nunca he entrenado con pesas',
      icon: SeedIcon,
      slug: 'new',
    },
    {
      title: 'Volví a empezar',
      description: 'Entrené antes pero lo dejé',
      icon: CycleIcon,
      slug: 'restart',
    },
    {
      title: 'Ya entreno',
      description: 'Voy al gym regularmente',
      icon: MuscleIcon,
      slug: 'experienced',
    },
  ],
  WORKOUT_PER_WEEK: [
    {
      value: '2',
      description: '¡Constancia mata cantidad!',
    },
    {
      value: '3',
      description: '¡El punto ideal para empezar!',
    },
    {
      value: '4',
      description: '¡Buen ritmo, vas en serio!',
    },
    {
      value: '5',
      description: '¡Eso es dedicación!',
    },
    {
      value: '6',
      description: '¡Gymrat mode!',
    },
  ],
  TIME_PER_WORKOUT: [
    {
      title: '30-45 minutos',
      description: 'Rápido y efectivo',
      icon: ThunderIcon,
      slug: 'low',
    },
    {
      title: '45-60 minutos',
      description: 'Ritmo cómodo para trabajar bien',
      icon: BurnIcon,
      slug: 'medium',
    },
    {
      title: 'Más de 60 minutos',
      description: 'Con calma, sin mirar el reloj',
      icon: ClockIcon,
      slug: 'high',
    },
  ],
}

