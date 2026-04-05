import { useTranslation } from 'react-i18next'
import { Image, StyleSheet, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'

import { DumbbellIcon, PlayIcon } from '@/assets/Icons'
import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

function CheckIcon({ width = 14, height = 14, color = '#FFFFFF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      <Path
        d="M2.91675 7.58333L5.25008 9.91667L11.0834 4.08333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

/**
 * @param {object} props
 * @param {string} props.name - Exercise name
 * @param {string|null} props.image - Exercise image URL
 * @param {number} props.sets - Number of sets
 * @param {'pending'|'in_progress'|'completed'} props.status - Exercise status
 */
export default function ExerciseCard({ name, image, sets, status = 'pending' }) {
  const { t } = useTranslation()

  const renderStatusIndicator = () => {
    if (status === 'completed') {
      return (
        <View style={styles.checkCircle}>
          <CheckIcon />
        </View>
      )
    }
    if (status === 'in_progress') {
      return (
        <View style={styles.playWrapper}>
          <PlayIcon width={18} height={18} color={colors.main} />
        </View>
      )
    }
    return <View style={styles.emptyCircle} />
  }

  return (
    <View style={[styles.card, status === 'in_progress' && styles.activeCard]}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <DumbbellIcon width={20} height={20} color={colors.whiteLight} />
          </View>
        )}
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
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 20,
    padding: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  activeCard: {
    borderColor: colors.main,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
