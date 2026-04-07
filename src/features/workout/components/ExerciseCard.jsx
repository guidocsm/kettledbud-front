import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'

import { CheckIcon, DumbbellIcon, PlayIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'
import { WORKOUT_STATUS } from '../utils/constants'

export default function ExerciseCard({
  name,
  image,
  sets,
  status = WORKOUT_STATUS.PENDING,
  onPress,
}) {
  const { t } = useTranslation()

  const renderStatusIndicator = () => {
    if (status === WORKOUT_STATUS.COMPLETED) {
      return (
        <View style={styles.checkCircle}>
          <CheckIcon width={22} height={22} />
        </View>
      )
    }
    if (status === WORKOUT_STATUS.IN_PROGRESS) {
      return (
        <View style={styles.playWrapper}>
          <PlayIcon width={18} height={18} />
        </View>
      )
    }
    return <View style={styles.emptyCircle} />
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        status === WORKOUT_STATUS.IN_PROGRESS && styles.activeCard,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <CustomText
          text={name}
          fontWeight={600}
          fontSize={14}
          color={colors.white}
        />
        <CustomText
          text={t('PREWORKOUT.SETS_INFO', { sets })}
          fontWeight={400}
          fontSize={12}
          color={colors.whiteLight}
        />
      </View>
      {renderStatusIndicator()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 12,
    height: 85,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  activeCard: {
    borderColor: colors.main,
    backgroundColor: colors.mainLight,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  placeholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  emptyCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  playWrapper: {
    backgroundColor: colors.main,
    width: 30,
    height: 30,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
