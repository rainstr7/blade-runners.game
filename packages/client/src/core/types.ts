import enemy2Image from '../assets/enemy2.png'

export interface GameObject {
  x: number
  y: number
  height: number
  width: number
}

export interface EnemySpriteParams {
  imageSrc: string
  width: number
  height: number
  y?: () => number | undefined
}

export interface EnemyParams {
  gameWidth: number
  gameHeight: number
  width: number
  height: number
  speed: number
  imageSrc: string
  y?: number
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
  source: string
  speed: number
}

export interface GameTextParams {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  text: string
  font: string
  fontSize: number
}
