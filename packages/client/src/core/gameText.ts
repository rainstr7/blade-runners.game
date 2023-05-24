import { GameTextParams } from './types'

class GameText {
  public static displayText(params: GameTextParams): void {
    const { ctx, x, y, text, font, fontSize, fillStyle } = params
    ctx.fillStyle = fillStyle ?? '#000'
    ctx.font = `${fontSize}px ${font}`
    ctx.fillText(text, x, y)
  }
}

export default GameText
