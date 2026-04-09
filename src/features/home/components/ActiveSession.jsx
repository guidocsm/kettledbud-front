import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { CheckIcon, PlayIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import Mascot from '@/src/components/Mascot'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'

export function ActiveSession({ nextSession, onPress, isWorkoutCompleted = false }) {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circle, isWorkoutCompleted && styles.completedCircle]}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <View style={styles.lightBorder}>
          {isWorkoutCompleted ? (
            <CheckIcon width={32} height={32} color={colors.mainBackground} />
          ) : (
            <PlayIcon />
          )}
        </View>
      </TouchableOpacity>
      <Mascot style={styles.mascot} />
      <View style={styles.labelsContainer}>
        <CustomText
          text={t('HOME.TODAY_LABEL')}
          fontWeight={700}
          fontSize={20}
          color={colors.white}
          textAlign="center"
        />
        {!!nextSession?.muscleGroup && (
          <CustomText
            text={t(`HOME.MUSCLE_GROUPS.${nextSession?.muscleGroup ?? ''}`)}
            fontWeight={600}
            fontSize={18}
            color={colors.whiteLight}
            textAlign="center"
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    gap: 30,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.mainLight,
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 2 },
  },
  completedCircle: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
  },
  lightBorder: {
    width: 67,
    height: 67,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.whiteLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascot: {
    position: 'absolute',
    right: 0,
    width: 109,
    height: 75,
  },
  labelsContainer: {
    alignItems: 'center',
  },
})

export default ActiveSession
