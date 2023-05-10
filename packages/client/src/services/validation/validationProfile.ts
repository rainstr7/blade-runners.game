import * as yup from 'yup'

const phoneRegExp = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/


export const validationProfileSchema = yup
  .object({
    firstName: yup.string().required(),
    secondName: yup.string(),
    email: yup.string().email().required(),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
    login: yup.string(),
    password: yup.string()
  })
  .required()
