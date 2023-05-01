class Player {
  x: number;
  y: number;
  xV: number;
  yV: number;
  height: number;
  width: number;

  private readonly weight: number;
  private readonly gameHeight: number;
  private readonly gameWidth: number;

  constructor(gameWidth: number, gameHeight: number, height: number, width: number, weight= 0.5) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.height = height;
    this.width = width;
    this.x = 150;
    this.y = gameHeight - height;
    this.xV = 0;
    this.yV = 0;
    this.weight = weight;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(pressedKeyCodes: string[]): void {
    // TODO более реальный джамп, поидее надо реагировать keyup отдельно чтобы проверять силу прыжка
    if (pressedKeyCodes.includes('Space') && this.onGround()) {
      console.log('Jump')
      this.yV = -20
    }

    this.y += this.yV;

    if(!this.onGround()) {
      this.yV += this.weight;
    }
  }

  private onGround(): boolean {
    return this.y >= this.gameHeight - this.height;
  }
}

export default Player;
