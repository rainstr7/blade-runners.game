import * as yup from 'yup'

export const regFormData = [
  {
    placeholder: 'FIRST NAME',
    name: 'first_name',
    autoComplete: 'first_name',
    required: true,
  },
  {
    placeholder: 'SECOND NAME',
    name: 'second_name',
    autoComplete: 'second_name',
    required: true,
  },
  {
    placeholder: 'DISPLAY NAME',
    name: 'display_name',
    autoComplete: 'display_name',
    required: true,
  },
  {
    placeholder: 'E-MAIL',
    name: 'email',
    autoComplete: 'email',
    required: true,
  },
  {
    placeholder: 'PHONE',
    name: 'phone',
    autoComplete: 'phone',
    required: true,
  },
  {
    placeholder: 'LOGIN',
    name: 'login',
    autoComplete: 'login',
    required: true,
  },
  {
    placeholder: 'PASSWORD',
    name: 'password',
    autoComplete: 'password',
    required: true,
  },
]
export const phoneRegExp = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
export const schema = yup
  .object({
    first_name: yup.string().required(),
    second_name: yup.string().required(),
    display_name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
    login: yup.string().required(),
    password: yup.string().required(),
  })
  .required()
