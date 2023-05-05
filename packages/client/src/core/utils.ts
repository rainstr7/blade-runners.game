import { GameObject } from './types'

export const calcPosition = <T extends GameObject>(gameObject: T) => {
  const { x, y, height, width } = gameObject
  return {
    top: y,
    bottom: y + height,
    left: x,
    right: x + width,
  }
}
