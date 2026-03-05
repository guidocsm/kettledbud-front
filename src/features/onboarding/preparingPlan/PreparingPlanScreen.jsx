import { useState, useEffect, useRef, memo } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TypewriterBubble } from '@/src/components/TypewriterBubble'
import { useOnboarding } from '@/src/contexts/OnboardingContext'
import apiClient from '@/src/services/apiClient'
import { ROUTES_NAMES } from '@/src/routes/routesNames'

const COLORS = {
  cream: '#FFF8F0',
  amber: '#F59E0B',
  amberDark: '#D97706',
  amberLight: '#FBBF24',
  mint: '#34D399',
  charcoal: '#2D3436',
  gunmetal: '#374151',
}

const STEPS = [
  { message: 'Analizando tus objetivos' },
  { message: 'Seleccionando los mejores ejercicios' },
  { message: 'Adaptando todo a tu nivel' },
  { message: 'Ajustando tiempos y descansos' },
  { message: 'Últimos retoques' },
  { message: '¡Tu plan está listo!' },
]

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const PROGRESS_BAR_WIDTH = Math.min(SCREEN_WIDTH - 80, 300)

const PARTICLES = ['🏋️', '⭐', '💛', '🔥', '✨', '💪']

const FloatingParticles = memo(function FloatingParticles() {
  const animations = useRef(
    PARTICLES.map(() => ({
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current

  useEffect(() => {
    animations.forEach((anim, i) => {
      const delay = i * 800
      const duration = 3000 + Math.random() * 2000

      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 0.15,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: -80,
              duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateY, {
              toValue: 0,
              duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start()
    })
  }, [])

  return (
    <View style={styles.particlesContainer} pointerEvents="none">
      {PARTICLES.map((emoji, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.particle,
            {
              left: `${12 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              opacity: animations[i].opacity,
              transform: [{ translateY: animations[i].translateY }],
            },
          ]}
        >
          {emoji}
        </Animated.Text>
      ))}
    </View>
  )
})

const CelebrationSparkles = memo(function CelebrationSparkles() {
  const sparkles = useRef(
    Array.from({ length: 6 }, () => ({
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current

  useEffect(() => {
    sparkles.forEach((s, i) => {
      Animated.sequence([
        Animated.delay(i * 100),
        Animated.parallel([
          Animated.spring(s.scale, {
            toValue: 1,
            friction: 4,
            tension: 60,
            useNativeDriver: true,
          }),
          Animated.timing(s.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(s.opacity, {
          toValue: 0,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }, [])

  const positions = [
    { top: -10, left: -10 },
    { top: -15, right: -10 },
    { top: 20, left: -20 },
    { top: 20, right: -20 },
    { bottom: -5, left: 0 },
    { bottom: -5, right: 0 },
  ]

  return (
    <>
      {sparkles.map((s, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.sparkle,
            positions[i],
            {
              opacity: s.opacity,
              transform: [{ scale: s.scale }],
            },
          ]}
        >
          ✨
        </Animated.Text>
      ))}
    </>
  )
})

const EXTRA_BUFFER_MS = 5000

// ─── Main component ──────────────────────────────────────
export default function PreparingPlan({
  pauseBetweenSteps = 1200,
  typewriterSpeed = 40,
  mascotSource = require('@/assets/images/kettlebud-logo.png'),
  mascotWidth = 140,
  mascotHeight = 160,
  bubbleWidth = 260,
  bubbleArrowDirection = 'bottom',
}) {
  const { onboardingState } = useOnboarding()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const progressAnim = useRef(new Animated.Value(0)).current
  const bubbleOpacity = useRef(new Animated.Value(1)).current
  const bobAnim = useRef(new Animated.Value(0)).current
  const navigatedRef = useRef(false)

  const isLastStep = currentStep === STEPS.length - 1

  // ─── Mascot bob ────────────────────────────────────────
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  // ─── API call + progress bar ───────────────────────────
  useEffect(() => {
    let mounted = true

    Animated.timing(progressAnim, {
      toValue: 0.6,
      duration: 12000,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start()

    const fetchPlan = async () => {
      const payload = {
        goal: onboardingState?.goal,
        experience: onboardingState?.experience,
        daysPerWeek: onboardingState?.daysPerWeek,
        timePerSession: onboardingState?.timePerSession,
        injuries: onboardingState?.injuries,
      }
      try {
        const data = await apiClient.post('/preview-plan', payload)

        if (!mounted) return

        progressAnim.stopAnimation(() => {
          Animated.timing(progressAnim, {
            toValue: 1,
            duration: EXTRA_BUFFER_MS,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start(async ({ finished }) => {
            if (!finished || !mounted || navigatedRef.current) return
            navigatedRef.current = true

            await AsyncStorage.setItem('previewPlan', JSON.stringify(data))
            router.replace(ROUTES_NAMES.PREVIEW_PLAN)
          })
        })
      } catch (error) {
        console.error('Error fetching preview plan:', error)
      }
    }

    fetchPlan()

    return () => { mounted = false }
  }, [])

  // ─── Typewriter step transitions (visual only) ─────────
  const handleTypewriterComplete = () => {
    if (isLastStep) {
      setIsComplete(true)
      return
    }

    setTimeout(() => {
      Animated.timing(bubbleOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep((prev) => prev + 1)

        requestAnimationFrame(() => {
          Animated.timing(bubbleOpacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }).start()
        })
      })
    }, pauseBetweenSteps)
  }

  const currentStepData = STEPS[currentStep]

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <FloatingParticles />

      {/* FIX 5: Animated.View con opacity envuelve el bubble */}
      <Animated.View style={[styles.bubbleWrapper, { opacity: bubbleOpacity }]}>
        <TypewriterBubble
          animated
          width={bubbleWidth}
          arrowDirection={bubbleArrowDirection}
          speed={typewriterSpeed}
          onComplete={handleTypewriterComplete}
        >
          <Text
            style={[
              styles.bubbleText,
              isComplete && styles.bubbleTextComplete,
            ]}
          >
            {currentStepData.message}
          </Text>
        </TypewriterBubble>
      </Animated.View>

      <Animated.View
        style={[
          styles.mascotContainer,
          {
            transform: [
              {
                translateY: bobAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          },
        ]}
      >
        <Image
          source={mascotSource}
          style={{ width: mascotWidth, height: mascotHeight }}
          resizeMode="contain"
        />
        {isComplete && <CelebrationSparkles />}
      </Animated.View>

      {/* FIX 6: Barra con Animated.View */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarFill,
              { width: progressWidth },
            ]}
          />
        </View>

        <View style={styles.dotsRow}>
          {STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index <= currentStep ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      </View>

      <Text style={styles.bottomText}>
        Kettlebi está preparando algo especial para ti
      </Text>
    </View>
  )
}

// ─── Styles ──────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Particles
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
    fontSize: 20,
  },

  // Bubble
  bubbleWrapper: {
    zIndex: 10,
    marginBottom: 12,
    alignItems: 'center',
    minHeight: 70,
    justifyContent: 'center',
  },
  bubbleText: {
    fontSize: 16,
    fontWeight: 600,
    // fontFamily: 'Baloo2_700Bold',
    // color: COLORS.charcoal,
    textAlign: 'center',
  },
  bubbleTextComplete: {
    // color: COLORS.mint,
  },

  // Mascot
  mascotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },

  // Sparkles
  sparkle: {
    position: 'absolute',
    fontSize: 16,
  },

  // Progress bar
  progressBarContainer: {
    width: PROGRESS_BAR_WIDTH,
    alignItems: 'center',
  },
  progressBarTrack: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.charcoal,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: COLORS.amber,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: COLORS.amber,
  },
  dotInactive: {
    backgroundColor: COLORS.gunmetal,
  },

  // Bottom
  bottomText: {
    marginTop: 48,
    fontSize: 13,
    fontFamily: 'Nunito_400Regular',
    color: COLORS.gunmetal,
    textAlign: 'center',
  },
})