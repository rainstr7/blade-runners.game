const ProfileFormData = [
  {
    placeholder: 'FIRST NAME',
    name: 'first_name',
    autoComplete: 'first_name',
    required: false,
  },
  {
    placeholder: 'SECOND NAME',
    name: 'second_name',
    autoComplete: 'second_name',
    required: false,
  },
  {
    placeholder: 'DISPLAY_NAME',
    name: 'display_name',
    autoComplete: 'display_name',
    required: false,
  },
  {
    placeholder: 'LOGIN',
    name: 'login',
    autoComplete: 'login',
    required: false,
  },
  {
    placeholder: 'E-MAIL',
    name: 'email',
    autoComplete: 'email',
    required: false,
  },
  {
    placeholder: 'PHONE',
    name: 'phone',
    autoComplete: 'phone',
    required: false,
  },
]

const PasswordFormData = [
  {
    placeholder: 'OLD PASSWORD',
    name: 'oldPassword',
    autoComplete: 'oldPassword',
    required: true,
  },
  {
    placeholder: 'NEW PASSWORD',
    name: 'newPassword',
    autoComplete: 'newPassword',
    required: true,
  },
]

export const FormField = {
  changeProfile: ProfileFormData,
  changePassword: PasswordFormData,
}

export const ButtonName = {
  changeProfile: 'Change Password',
  changePassword: 'Change Profile',
}
