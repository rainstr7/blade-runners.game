import bg from '../assets/game_bg.png'

class Background {
  private image;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private speed: number;

  constructor() {
    this.image = new Image();
    this.image.src = bg;

    this.x = 0;
    this.y = 0;
    this.width = 1024;
    this.height = 768;
    this.speed = 3;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
  }

  update() {
    this.x -= this.speed;
    if(this.x < 0 - this.width) {
      this.x = 0;
    }
  }
}

export default Background;
