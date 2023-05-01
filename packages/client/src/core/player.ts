class Player {
  x: number;
  y: number
  xV: number
  yV: number
  jump: boolean
  height: number
  width: number

  gravity = 0.6 ;


  constructor() {
    this.x = 150;
    this.y = 0;
    this.xV = 0;
    this.yV = 0;
    this.jump = true;
    this.height = 100;
    this.width = 100;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ff00ff'
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update(pressedKeyCodes: string[]): void {
    // if (this.)
    if (this.jump) {
      this.yV += this.gravity;
    }

    this.jump = true;

    this.y += this.yV;
    this.x += this.xV;
  }
}

export default Player;
