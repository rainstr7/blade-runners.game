// import { REDIRECT_URI } from '../config/oAuth.config'

export const BASE_API = 'https://ya-praktikum.tech/api/v2'
export const SERVER_API = `http://localhost:3001/api`
// export const SERVER_API = `${REDIRECT_URI}api` todo поменять перед деплоем на облако

export const signin = `${BASE_API}/auth/signin`
export const oAuthSignin = `${BASE_API}/oauth/yandex`
export const signup = `${BASE_API}/auth/signup`
export const userData = `${BASE_API}/auth/user`
export const logoutURL = `${BASE_API}/auth/logout`
export const createUserProfile = `${BASE_API}/auth/signup`
export const changeUserProfile = `${BASE_API}/user/profile`
export const changeUserPassword = `${BASE_API}/user/password`
export const changeUserAvatar = `${BASE_API}/user/profile/avatar`
export const getServiceId = `${BASE_API}/oauth/yandex/service-id`
export const addScoreResult = `${BASE_API}/leaderboard`
export const leaderboardData = `${BASE_API}/leaderboard/`

export const forums = `${SERVER_API}/forums`
export const messages = `${SERVER_API}/messages`

export const emoji = `${SERVER_API}/emoji`
