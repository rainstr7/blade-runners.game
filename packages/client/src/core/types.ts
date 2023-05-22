export interface GameObject {
  x: number
  y: number
  height: number
  width: number
}

export type KeyConfiguration = Record<'Space', 'up' | 'down'>

export interface EnemySpriteParams {
  imageSrc: string
  width: number
  height: number
  y?: () => number | undefined
}

export interface EnemyParams {
  x: number,
  y: number,
  width: number,
  height: number,
  gameSpeed: number,
  speedModifier: number,
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
  fontSize: number,
  fillStyle?: string
}

export interface LayerParams {
  gameSpeed: number
  gameWidth: number
  gameHeight: number
  speedModifier: number
  image: HTMLImageElement
}
