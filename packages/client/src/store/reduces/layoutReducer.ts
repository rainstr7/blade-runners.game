import { CHANGE_LAYOUT_VIEW } from '../actions/types'

const initialState = {
  type: 'Default',
}

export default function layoutReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_LAYOUT_VIEW:
      return {
        ...state,
        type: action.view,
      }
    default:
      return state
  }
}
