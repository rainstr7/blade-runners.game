import { BASE_API } from '../api'

const getAvatarFullUrl = (fileName: string | undefined) =>
  fileName ? `${BASE_API}/resources${fileName}` : undefined

export default getAvatarFullUrl
