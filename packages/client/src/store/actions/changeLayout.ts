import { CHANGE_LAYOUT_VIEW } from './types'
import { LayoutView } from '../reduces/interfaces'

export const changeLayout = (payload: LayoutView) => {
  return {
    type: CHANGE_LAYOUT_VIEW,
    payload,
  }
}
