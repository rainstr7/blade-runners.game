export const errors = {
  '404': 'OOOPS... SOMETHING WENT WRONG',
  '500': "OOOPS... THIS PAGE DOESN'T EXIST",
}

export type ErrorType = keyof typeof errors
