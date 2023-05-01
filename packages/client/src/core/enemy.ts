class Enemy {
  x: number;
  y: number;
  height: number;
  width: number;
  markForDelete: boolean;

  private readonly gameWidth: number;
  private readonly gameHeight: number;
  private readonly speed: number;

  constructor(gameWidth: number, gameHeight: number, width: number, height: number, speed: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = width;
    this.height = height;
    this.x = this.gameWidth;
    this.y = this.gameHeight - this.height;
    this.speed = speed
    this.markForDelete = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  update(): void {
    this.x -= this.speed;
    if (this.x < 0 - this.width) {
      this.markForDelete = true;
    }
  }
}

export default Enemy;
