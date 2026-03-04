import { Picker } from '@react-native-picker/picker'
import { View, StyleSheet, Platform } from 'react-native'

import { colors } from '@/src/constants/theme'
import { useBirthdayDate } from '@/src/hooks/useBirthdayDate'

const MONTH_LABELS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 120 }, (_, i) => currentYear - i)
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

export function DatePicker({ initialDate, onDateChange }) {
  const {
    safeDay,
    month,
    year,
    maxDay,
    handleDayChange,
    handleMonthChange,
    handleYearChange,
  } = useBirthdayDate({ initialDate, onDateChange })

  const itemStyle = Platform.OS === 'ios' ? { fontSize: 18 } : undefined

  return (
    <View style={styles.wheelRow}>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={safeDay}
          onValueChange={handleDayChange}
          style={styles.picker}
          itemStyle={itemStyle}
          mode={Platform.OS === 'android' ? 'dialog' : undefined}
          prompt={Platform.OS === 'android' ? 'Día' : undefined}
        >
          {DAYS.filter((d) => d <= maxDay).map((d) => (
            <Picker.Item key={d} label={String(d)} value={d} color={colors.white} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={month}
          onValueChange={handleMonthChange}
          style={styles.picker}
          itemStyle={itemStyle}
          mode={Platform.OS === 'android' ? 'dialog' : undefined}
          prompt={Platform.OS === 'android' ? 'Mes' : undefined}
        >
          {MONTH_LABELS.map((label, i) => (
            <Picker.Item key={i} label={label} value={i + 1} color={colors.white} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={year}
          onValueChange={handleYearChange}
          style={styles.picker}
          itemStyle={itemStyle}
          mode={Platform.OS === 'android' ? 'dialog' : undefined}
          prompt={Platform.OS === 'android' ? 'Año' : undefined}
        >
          {YEARS.map((y) => (
            <Picker.Item key={y} label={String(y)} value={y} color={colors.white} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wheelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.main,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  pickerWrap: {
    flex: 1,
  },
  picker: {
    width: '100%',
    ...(Platform.OS === 'android' && { color: colors.white }),
  },
})
