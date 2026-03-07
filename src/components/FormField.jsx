import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../constants/theme'
import CustomText from './CustomText'

export function FormField({
  label,
  placeholder,
  name,
  value,
  onChange,
  keyboardType = 'default',
  autoCapitalize = 'none',
  ...props
}) {
  const { errors, touched, handleBlur, handleChange } = useFormikContext()
  const { t } = useTranslation()

  return (
    <View style={styles.inputContainer}>
      <CustomText
        text={label}
        fontSize={16}
        fontWeight={300}
        color={colors.white}
      />
      <TextInput
        style={[
          styles.input,
          {
            borderColor:
              errors[name] && touched[name] ? colors.error : colors.border,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.whiteLight}
        value={value}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {errors[name] && touched[name] && (
        <CustomText
          text={t(errors[name])}
          fontSize={12}
          fontWeight={300}
          color={colors.error}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: colors.white,
    fontSize: 16,
  },
})
