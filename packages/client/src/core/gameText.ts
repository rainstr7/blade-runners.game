class GameText {
  public static displayText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, font: string, fontSize: number): void {
    ctx.fillStyle = '#000';
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillText(text, x, y)
  }
}

export default GameText;
