import { GameTextParams } from './types'

class GameText {
  public static displayText(params: GameTextParams): void {
    const { ctx, x, y, text, font, fontSize } = params
    ctx.fillStyle = '#000'
    ctx.font = `${fontSize}px ${font}`
    ctx.fillText(text, x, y)
  }
}

export default GameText
