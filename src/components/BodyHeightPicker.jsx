import { Picker } from '@react-native-picker/picker'
import { View, StyleSheet, Pressable, Platform } from 'react-native'

import CustomText from '@/src/components/CustomText'
import { colors, fontDisplay } from '@/src/constants/theme'
import {
  CM_VALUES,
  FT_IN_VALUES,
  UNIT_HEIGHT_CM,
  UNIT_HEIGHT_FT,
} from '@/src/features/onboarding/bodyMetrics/utils/constants'
import { useBodyHeight } from '@/src/hooks/useBodyHeight'

export function BodyHeightPicker({ initialHeight, unit: initialUnit = UNIT_HEIGHT_CM, onHeightChange }) {
  const { cm, totalInches, unit, handleCmChange, handleFtInChange, switchUnit } = useBodyHeight({
    initialHeight,
    unit: initialUnit,
    onHeightChange,
  })

  const itemStyle = Platform.OS === 'ios' ? { fontSize: 22, color: colors.white } : undefined

  return (
    <View style={styles.container}>
      <View style={styles.toggle}>
        <Pressable
          style={[styles.toggleBtn, unit === UNIT_HEIGHT_CM && styles.toggleBtnActive]}
          onPress={() => switchUnit(UNIT_HEIGHT_CM)}
        >
          <CustomText
            text={UNIT_HEIGHT_CM}
            fontWeight={600}
            fontSize={16}
            color={unit === UNIT_HEIGHT_CM ? colors.main : colors.whiteLight}
            textAlign="center"
          />
        </Pressable>
        <Pressable
          style={[styles.toggleBtn, unit === UNIT_HEIGHT_FT && styles.toggleBtnActive]}
          onPress={() => switchUnit(UNIT_HEIGHT_FT)}
        >
          <CustomText
            text={UNIT_HEIGHT_FT}
            fontWeight={600}
            fontSize={16}
            color={unit === UNIT_HEIGHT_FT ? colors.main : colors.whiteLight}
            textAlign="center"
          />
        </Pressable>
      </View>
      <View style={styles.pickerWrap}>
        {unit === UNIT_HEIGHT_CM ? (
          <Picker
            selectedValue={cm}
            onValueChange={handleCmChange}
            style={styles.picker}
            itemStyle={itemStyle}
            mode={Platform.OS === 'android' ? 'dialog' : undefined}
            prompt={Platform.OS === 'android' ? 'Altura' : undefined}
          >
            {CM_VALUES.map((v) => (
              <Picker.Item key={v} label={String(v)} value={v} color={colors.white} />
            ))}
          </Picker>
        ) : (
          <Picker
            selectedValue={totalInches}
            onValueChange={handleFtInChange}
            style={styles.picker}
            itemStyle={itemStyle}
            mode={Platform.OS === 'android' ? 'dialog' : undefined}
            prompt={Platform.OS === 'android' ? 'Altura' : undefined}
          >
            {FT_IN_VALUES.map(({ totalInches: ti, label }) => (
              <Picker.Item key={ti} label={label} value={ti} color={colors.white} />
            ))}
          </Picker>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.main,
    borderRadius: 20,
    height: 40,
    overflow: 'hidden',
    width: '100%',
  },
  toggleBtn: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
  },
  toggleBtnActive: {
    backgroundColor: colors.mainLight,
  },
  pickerWrap: {
    borderWidth: 2,
    borderColor: colors.main,
    borderRadius: 20,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    ...(Platform.OS === 'android' && { color: colors.white }),
  },
})
