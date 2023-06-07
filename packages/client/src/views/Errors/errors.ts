export const errors = {
  '404': "OOOPS... THIS PAGE DOESN'T EXIST",
  '500': 'OOOPS... SOMETHING WENT WRONG',
}

export type ErrorType = keyof typeof errors
