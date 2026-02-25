import { View, StyleSheet, Pressable, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CustomText from '@/src/components/CustomText'
import { colors, fontDisplay } from '@/src/constants/theme'
import { useBodyWeight } from '@/src/hooks/useBodyWeight'
import { UNIT_WEIGHT_KG, UNIT_WEIGHT_LB } from '@/src/features/onboarding/bodyMetrics/utils/constants'

export function BodyWeightPicker({ initialWeight, unit: initialUnit = UNIT_WEIGHT_KG, onWeightChange }) {
  const { weight, unit, values, handleValueChange, switchUnit } = useBodyWeight({
    initialWeight,
    unit: initialUnit,
    onWeightChange,
  })

  const itemStyle = Platform.OS === 'ios' ? { fontSize: 22, color: colors.white } : undefined

  return (
    <View style={styles.container}>
      <CustomText
        text="PESO"
        fontFamily={fontDisplay}
        fontWeight={700}
        fontSize={14}
        color={colors.white}
        textAlign="center"
        extraStyle={{ alignSelf: 'center' }}
      />

      <View style={styles.toggle}>
        <Pressable
          style={[styles.toggleBtn, unit === UNIT_WEIGHT_KG && styles.toggleBtnActive]}
          onPress={() => switchUnit(UNIT_WEIGHT_KG)}
        >
          <CustomText
            text={UNIT_WEIGHT_KG}
            fontWeight={600}
            fontSize={13}
            color={unit === UNIT_WEIGHT_KG ? colors.main : colors.whiteLight}
            textAlign="center"
          />
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, unit === UNIT_WEIGHT_LB && styles.toggleBtnActive]}
          onPress={() => switchUnit(UNIT_WEIGHT_LB)}
        >
          <CustomText
            text={UNIT_WEIGHT_LB}
            fontWeight={600}
            fontSize={13}
            color={unit === UNIT_WEIGHT_LB ? colors.main : colors.whiteLight}
            textAlign="center"
          />
        </Pressable>
      </View>

      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={weight}
          onValueChange={handleValueChange}
          style={styles.picker}
          itemStyle={itemStyle}
          mode={Platform.OS === 'android' ? 'dialog' : undefined}
          prompt={Platform.OS === 'android' ? 'Peso' : undefined}
        >
          {values.map((v) => (
            <Picker.Item key={v} label={String(v)} value={v} color={colors.white} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    gap: 8,
  },
  toggle: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: colors.main,
    borderRadius: 20,
    overflow: 'hidden',
  },
  toggleBtn: {
    paddingVertical: 4,
    paddingHorizontal: 14,
  },
  toggleBtnActive: {
    backgroundColor: colors.mainLight,
  },
  pickerWrap: {
    borderWidth: 2,
    borderColor: colors.main,
    borderRadius: 16,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    ...(Platform.OS === 'android' && { color: colors.white }),
  },
})
