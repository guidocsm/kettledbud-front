import * as yup from 'yup'

export const signUpValidations = yup.object().shape({
  email: yup
    .string()
    .email('COMMON.FORM.EMAIL.INVALID')
    .required('COMMON.FORM.REQUIRED_FIELD')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'COMMON.FORM.EMAIL.INVALID'),
})
