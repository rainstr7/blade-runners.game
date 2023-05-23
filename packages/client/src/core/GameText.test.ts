import GameText from './gameText'
import { GameTextParams } from './types'

describe('GameText', () => {
  const ctx: any = {
    fillStyle: '',
    font: '',
    fillText: jest.fn(),
  }
  const x = 100
  const y = 200
  const text = 'BLADE RUNNERS'
  const font = 'Arial'
  const fontSize = 24

  const params: GameTextParams = {
    ctx,
    x,
    y,
    text,
    font,
    fontSize,
  }

  test('корректное отображение текста', () => {
    GameText.displayText(params)

    expect(ctx.fillStyle).toBe('#000')
    expect(ctx.font).toBe(`${fontSize}px ${font}`)
    expect(ctx.fillText).toHaveBeenCalledWith(text, x, y)
  })
})
