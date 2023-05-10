import { CHANGE_LAYOUT_VIEW } from './types'
import { LayoutView } from '../reduces/interfaces'

export const changeLayout = (view: LayoutView) => {
  return {
    type: CHANGE_LAYOUT_VIEW,
    view,
  }
}
