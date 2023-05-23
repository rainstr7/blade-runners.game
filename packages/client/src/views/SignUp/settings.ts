import * as yup from 'yup'

export const regFormData = [
  {
    placeholder: 'FIRST NAME',
    name: 'firstName',
    autoComplete: 'firstName',
    required: true,
  },
  {
    placeholder: 'SECOND NAME',
    name: 'secondName',
    autoComplete: 'secondName',
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
    firstName: yup.string().required(),
    secondName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
    login: yup.string().required(),
    password: yup.string().required(),
  })
  .required()
