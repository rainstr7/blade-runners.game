import { REDIRECT_URI } from '../config/oAuth.config'

// export const BASE_API = 'https://ya-praktikum.tech/api/v2'
export const SERVER_API = `${REDIRECT_URI}/api`
export const REDIRECT_API = `${REDIRECT_URI}/yandex-api`
export const signin = `${REDIRECT_API}/auth/signin`
export const oAuthSignin = `${REDIRECT_API}/oauth/yandex`
export const userData = `${REDIRECT_API}/auth/user`
export const logoutURL = `${REDIRECT_API}/auth/logout`
export const createUserProfile = `${REDIRECT_API}/auth/signup`
export const changeUserProfile = `${REDIRECT_API}/user/profile`
export const changeUserPassword = `${REDIRECT_API}/user/password`
export const changeUserAvatar = `${REDIRECT_API}/user/profile/avatar`
export const getServiceId = `${REDIRECT_API}/oauth/yandex/service-id`
export const addScoreResult = `${REDIRECT_API}/leaderboard`
export const leaderboardData = `${REDIRECT_API}/leaderboard/`

export const theme = `${SERVER_API}/theme`
export const forums = `${SERVER_API}/forums`
export const messages = `${SERVER_API}/messages`
export const emoji = `${SERVER_API}/emoji`
