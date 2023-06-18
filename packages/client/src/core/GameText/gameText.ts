import { GameTextParams } from '../types'

class GameText {
  public static displayText(params: GameTextParams): void {
    const { ctx, x, y, text, font, fontSize, fillStyle, shadowColor } = params
    ctx.fillStyle = shadowColor ?? '#fff'
    ctx.font = `${fontSize}px ${font ?? 'ForceRunner, Helvetica'}`
    ctx.fillText(text, x + 4, y + 4)

    ctx.fillStyle = fillStyle ?? '#000'
    ctx.font = `${fontSize}px ${font ?? 'ForceRunner, Helvetica'}`
    ctx.fillText(text, x, y)
  }
}

export default GameText
