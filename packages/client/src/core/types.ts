export interface GameObject {
  x: number
  y: number
  height: number
  width: number
}

export type EnemyType = 0 | 1 | 2

export type KeyConfiguration = Record<'Space', 'up' | 'down'>

export interface EnemyParams {
  x: number
  y: number
  width: number
  height: number
  gameSpeed: number
  speedModifier: number
  imageSrc: string
}

export interface PlayerParams {
  gameWidth: number
  gameHeight: number
  height: number
  width: number
  weight?: number
  imageSrc: string
}

export interface BackgroundParams {
  gameWidth: number
  gameHeight: number
  gameSpeed: number
  sources: string[]
}

export interface GameTextParams {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  text: string
  font: string
  fontSize: number
  fillStyle?: string
}

export interface LayerParams {
  gameSpeed: number
  gameWidth: number
  gameHeight: number
  speedModifier: number
  image: HTMLImageElement
}
