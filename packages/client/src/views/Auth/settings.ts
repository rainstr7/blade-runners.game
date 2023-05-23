import * as yup from 'yup'

export const authFormData = [
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

export const schema = yup
  .object({
    login: yup.string().required(),
    password: yup.string().required(),
  })
  .required()
