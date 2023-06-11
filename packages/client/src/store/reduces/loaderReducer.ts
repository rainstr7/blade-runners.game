import { ActionInterface, LoadingPayloadInterface } from './interfaces'
import { HIDE_LOADER, SHOW_LOADER } from '../actions/types'

const initialState: LoadingPayloadInterface = {
  loading: false,
}

export default function loaderReducer(
  state = initialState,
  action: ActionInterface
) {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: true,
      }
    case HIDE_LOADER:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
