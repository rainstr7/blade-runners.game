import * as yup from 'yup'

const phoneRegExp = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
// const passwordRegExp = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/ //нет строчных букв и кирилицы в шрифте

const validationProfileSchema = yup
  .object({
    first_name: yup.string(),
    second_name: yup.string(),
    email: yup.string().email(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    login: yup.string(),
    password: yup.string(),
  })
  .required()

const validationPasswordSchema = yup
  .object({
    oldPassword: yup.string(),
    newPassword: yup.string(),
  })
  .required()

const schema = {
  changeProfile: validationProfileSchema,
  changePassword: validationPasswordSchema,
}

export default schema
