import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import { PlayIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { useTranslation } from 'react-i18next'

export function ActiveSession({ nextSession, onPress }) {
  const { t } = useTranslation()

  const muscleGroupKey = nextSession?.muscleGroup ?? null

  const muscleGroupLabel =
    muscleGroupKey != null
      ? t(`HOME.MUSCLE_GROUPS.${muscleGroupKey}`, { defaultValue: '' })
      : ''

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.circle}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <View style={styles.lightBorder}>
          <PlayIcon />
        </View>
      </TouchableOpacity>
      <Image
        source={require('@/assets/images/kettlebud-logo.png')}
        style={styles.mascot}
        resizeMode="contain"
      />
      <View style={styles.labelsContainer}>
        <CustomText
          text={t('HOME.TODAY_LABEL')}
          fontWeight={700}
          fontSize={20}
          color={colors.white}
          textAlign="center"
        />
        {!!muscleGroupLabel && (
          <CustomText
            text={muscleGroupLabel}
            fontWeight={600}
            fontSize={16}
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
    marginTop: 32,
    marginBottom: 40,
    gap: 30,
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.main,
    shadowOpacity: 1,
    shadowRadius: 0.8,
    shadowOffset: { width: 0, height: 2 },
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
    shadowColor: colors.mainLight,
    shadowOpacity: 30,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  labelsContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
})

export default ActiveSession
