import * as yup from 'yup'

const validationProfileSchema = yup
  .object({
    first_name: yup.string(),
    second_name: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
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
