import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors } from '@/src/constants/theme'

const MIN_REST = 30
const MAX_REST = 180
const STEP = 15

/**
 * @param {object} props
 * @param {number} props.value - Current rest time in seconds
 * @param {(value: number) => void} props.onChange - Callback when value changes
 */
export default function RestStepper({ value, onChange }) {
  const { t } = useTranslation()

  const canDecrement = value - STEP >= MIN_REST
  const canIncrement = value + STEP <= MAX_REST

  return (
    <View style={styles.container}>
      <CustomText
        text={t('PREWORKOUT.REST_BETWEEN_SETS')}
        fontWeight={500}
        fontSize={14}
        color={colors.whiteLight}
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, !canDecrement && styles.buttonDisabled]}
          onPress={() => onChange(value - STEP)}
          disabled={!canDecrement}
        >
          <CustomText
            text="−"
            fontWeight={700}
            fontSize={18}
            color={canDecrement ? colors.main : colors.gray}
            textAlign="center"
          />
        </TouchableOpacity>
        <CustomText
          text={`${value}s`}
          fontWeight={700}
          fontSize={22}
          color={colors.white}
        />
        <TouchableOpacity
          style={[styles.button, !canIncrement && styles.buttonDisabled]}
          onPress={() => onChange(value + STEP)}
          disabled={!canIncrement}
        >
          <CustomText
            text="+"
            fontWeight={700}
            fontSize={18}
            color={canIncrement ? colors.main : colors.gray}
            textAlign="center"
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#252525',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    borderColor: colors.gray,
  },
})
