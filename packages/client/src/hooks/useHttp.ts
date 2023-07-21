import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../store/actions/loading'
import { useNavigate } from 'react-router-dom'

function checkData(data: Response) {
  return data.ok
}

export const useHttp = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const addError = useCallback((error: string) => {
    setError(error)
  }, [])

  const request = useCallback(
    async (
      url: string,
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
      body: null | object = null,
      headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Content-Security-Policy': 'default-src *',
        'X-Content-Security-Policy': 'default-src *',
        'X-WebKit-CSP': 'default-src *',
      }
    ) => {
      dispatch(showLoader())
      try {
        const init: RequestInit = {
          method,
          credentials: 'include',
        }
        if (body instanceof FormData) {
          init.body = body
        } else {
          init.body = body ? JSON.stringify(body) : null
          init.headers = headers
        }
        const response = await fetch(url, init)
        const isJSON = Boolean(
          response?.headers?.get('Content-Type')?.includes('json')
        )
        const parser = isJSON ? 'json' : 'text'
        const data = await response[parser]()
        dispatch(hideLoader())
        if (!checkData(response) && isJSON) {
          setError(data.reason)
          return { data, status: response.status }
        }
        return { data, status: response.status }
      } catch (err: unknown) {
        dispatch(hideLoader())
        setError('Something wrong')
        navigate('/500')
        throw err
      }
    },
    []
  )
  const clearError = useCallback(() => setError(null), [])
  return { request, error, clearError, addError }
}

export default useHttp
