import { REDIRECT_API } from '../api'

const getAvatarFullUrl = (fileName: string | undefined) =>
  fileName ? `${REDIRECT_API}/resources${fileName}` : undefined

export default getAvatarFullUrl
