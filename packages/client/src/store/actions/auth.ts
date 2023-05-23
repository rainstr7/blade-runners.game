import { AUTH_LOGOUT, AUTH_SUCCESS } from './types'
import { ActionInterface } from '../reduces/interfaces'
import { Dispatch } from 'redux'

interface dataInterface {
  token: string
  userId: string
  expiresIn: number
}

//todo подставить значение с бека и отредактировать ключи в соответствии с API

export const auth =
  (email: string, password: string, isLogin: boolean) =>
  async (dispatch: Dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }
    let url = ''
    if (isLogin) {
      url = ''
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(authData),
      })
      const data: dataInterface = await response.json()
      if (response.ok) {
        const backendExpirationTime = new Date().getTime() //
        const expirationDate = new Date(
          new Date().getTime() + backendExpirationTime * 1000 //
        )
        localStorage.setItem('token', data.token) //
        localStorage.setItem('userId', data.userId) //
        localStorage.setItem('expirationDate', String(expirationDate))
        dispatch(authSuccess(data.token))
        dispatch(autoLogout(data.expiresIn))
      }
    } catch (err) {
      const typedError = err as Error
      console.log(typedError?.message)
    }
  }

export function authSuccess(payload: string): ActionInterface {
  return {
    type: AUTH_SUCCESS,
    payload,
  }
}

export function logout(): ActionInterface {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT,
  }
}

export default function autoLogin() {
  return (dispatch: Dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const savedExpirationDate = localStorage.getItem('expirationDate')
      if (savedExpirationDate) {
        const expirationDate = new Date(savedExpirationDate)
        if (expirationDate <= new Date()) {
          dispatch(logout())
        } else {
          dispatch(authSuccess(token))
          dispatch(
            autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
          )
        }
      }
    }
  }
}

export function autoLogout(time: number): any {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}
