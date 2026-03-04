import { useCallback, useRef, useState } from "react";
import { Animated, LayoutAnimation, Pressable, StyleSheet, UIManager, Platform, View } from "react-native";
import { ChevronIcon } from "@/assets/Icons";
import CustomText from "@/src/components/CustomText";
import { colors } from "@/src/constants/theme";

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

function RoutineCard({ routine }) {
  const [expanded, setExpanded] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

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

  return (
    <Pressable onPress={toggle} style={styles.routineContainer}>
      <View style={styles.routineHeader}>
        <View style={styles.routineHeaderLeft}>
          <View style={styles.dayIndexContainer}>
            <CustomText 
              text={`D${routine.dayIndex}`} 
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
              text={`${routine.muscleGroup} | ${routine.exercises.length} ejercicios`} 
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
            {routine.exercises.map((exercise, exerciseIndex) => (
              <View style={styles.exerciseContent} key={exercise.id}>
                <View style={styles.excerciseIndex}>
                  <CustomText 
                    text={exerciseIndex + 1}
                    color={colors.white}
                    fontWeight={700}
                    fontSize={12}
                  />
                </View>
                <CustomText text={exercise.name} color={colors.white} fontWeight={600} fontSize={14} />
              </View>
            ))}
          </View>
        </>
      )}
    </Pressable>
  );
}

export function WeeklyPlan({ previewPlan = null }) {
  return (
    <View style={styles.container}>
      <CustomText 
        text="Tu plan semanal" 
        color={colors.white} 
        fontWeight={600} 
        fontSize={20} 
      />
      <View style={styles.planContainer}>
        {previewPlan?.routines?.map(routine => (
          <RoutineCard key={routine.dayIndex} routine={routine} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  planContainer: {
    gap: 20,
  },
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
})
