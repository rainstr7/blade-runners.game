import { configureStore } from '@reduxjs/toolkit'
import rootStore from '../store/reduces/root'

const reducer = rootStore

export function create(initialState?: any) {
  return configureStore({
    reducer,
    preloadedState: initialState,
  })
}
