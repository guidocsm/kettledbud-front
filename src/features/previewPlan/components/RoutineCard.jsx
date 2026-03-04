import { useCallback, useRef, useState } from "react";
import { Animated, Image, LayoutAnimation, Pressable, StyleSheet, UIManager, Platform, View } from "react-native";
import { ChevronIcon, LockIcon } from "@/assets/Icons";
import CustomText from "@/src/components/CustomText";
import { colors } from "@/src/constants/theme";
import { useTranslation } from "react-i18next";
import { MUSCULAR_GROUPS } from "../constants";
import { BlurView } from "expo-blur";

const VISIBLE_EXERCISES = 2;

export function RoutineCard({ routine }) {
  const [expanded, setExpanded] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const { t } = useTranslation()

  const toggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      250,
      LayoutAnimation.Types.easeInEaseOut,
      LayoutAnimation.Properties.opacity,
    ));
    Animated.timing(rotation, {
      toValue: expanded ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setExpanded(prev => !prev);
  }, [expanded, rotation]);

  const chevronRotation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const exercises = routine?.exercises?.map((exercise, index) => ({
    ...exercise,
    isLocked: index >= VISIBLE_EXERCISES,
  }))

  const hasLockedExercises = exercises?.some(e => e.isLocked)

  return (
    <Pressable onPress={toggle} style={styles.routineContainer}>
      <View style={styles.routineHeader}>
        <View style={styles.routineHeaderLeft}>
          <View style={styles.dayIndexContainer}>
            <CustomText 
              text={routine.dayIndex} 
              color={colors.white} 
              fontWeight={600} 
              fontSize={12} 
            />
          </View>
          <View style={styles.routineTitle}>
            <CustomText 
              text={routine.name} 
              color={colors.white} 
              fontWeight={700} 
              fontSize={16} 
            />
            <CustomText 
              text={t('PREVIEW_PLAN.WEEKLY_PLAN.MUSCULAR_GROUP_AND_EXERCISES', { 
                muscularGroup: t(`PREVIEW_PLAN.MUSCULAR_GROUPS.${MUSCULAR_GROUPS[routine.muscleGroup]}`), 
                exercises: routine.exercises.length 
              })} 
              color={colors.whiteLight} 
              fontWeight={600} 
              fontSize={14} 
            />
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <ChevronIcon color={colors.white} />
        </Animated.View>
      </View>
      {expanded && (
        <>
          <View style={styles.divider} />
          <View style={styles.exercisesContainer}>
            {exercises.map((exercise, index) => (
              <View style={styles.exerciseContent} key={exercise.id}>
                {exercise.isLocked ? (
                  <View style={styles.lockIconContainer}>
                    <LockIcon color={colors.whiteLight} />
                  </View>
                ) : (
                  <View style={styles.excerciseIndex}>
                    <CustomText 
                      text={index + 1}
                      color={colors.whiteLight}
                      fontWeight={700}
                      fontSize={12}
                    />
                  </View>
                )}
                {exercise.isLocked ? (
                  <View style={styles.blurredTextWrapper}>
                    <CustomText 
                      text={exercise.name} 
                      color={colors.whiteLight} 
                      fontWeight={600} 
                      fontSize={14} 
                    />
                    <BlurView 
                      intensity={15} 
                      tint="dark" 
                      style={StyleSheet.absoluteFill} 
                    />
                  </View>
                ) : (
                  <CustomText text={exercise.name} color={colors.whiteLight} fontWeight={600} fontSize={14} />
                )}
              </View>
            ))}
            {hasLockedExercises && (
              <View style={styles.kettlebiContainer}>
                <Image
                  source={require('@/assets/images/kettlebud-logo.png')}
                  style={styles.kettlebiImage}
                  resizeMode="contain"
                />
                <CustomText 
                  text={t('PREVIEW_PLAN.WEEKLY_PLAN.LOCKED_MESSAGE')}
                  color={colors.main}
                  fontWeight={600}
                  fontSize={12}
                />
              </View>
            )}
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  routineContainer: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: colors.main,
    padding: 20,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  routineHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dayIndexContainer: {
    backgroundColor: colors.mainBackground,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routineTitle: {
    gap: 6,
  },
  divider: {
    height: 1,
    backgroundColor: colors.whiteLight,
    width: '100%',
  },
  exercisesContainer: {
    gap: 10,
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  excerciseIndex: {
    backgroundColor: colors.mainBackground,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIconContainer: {
    backgroundColor: colors.mainBackground,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  kettlebiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.mainLight,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 4,
  },
  kettlebiImage: {
    width: 30,
    height: 30,
  },
})