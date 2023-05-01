class Enemy {
  private gameWidth: number;
  private gameHeight: number;
  x: number;
  y: number;
  height: number;
  width: number;
  private speed: number;
  markForDelete: boolean;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 50;
    this.height = 50;
    this.x = this.gameWidth;
    this.y = this.gameHeight - this.height;
    this.speed = 5
    this.markForDelete = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.width) {
      this.markForDelete = true;
    }
  }
}

export default Enemy;
