import { Enemy, FlyingEnemy, GroundEnemy } from './enemy';
import { EnemyParams } from './types';

enum FlyingEnemyParams {
  vAngle = 'vAngle',
  angle = 'angle',
}

describe('Enemy', () => {
  const gameWidth = 800;
  const gameHeight = 600;
  const width = 50;
  const height = 50;
  const speed = 5;
  const imageSrc = '../assets/enemy3.png';

  const params: EnemyParams = {
    x: gameWidth,
    y: gameHeight - height,
    width,
    height,
    gameSpeed: speed,
    speedModifier: 0,
    imageSrc,
  };

  let enemy: Enemy;

  beforeEach(() => {
    enemy = new Enemy(params.x,params.y, params.width, params.height);
  });

  test('инициализация параметров врага', () => {
    expect(enemy.x).toBe(gameWidth);
    expect(enemy.y).toBe(gameHeight - height);
    expect(enemy.width).toBe(width);
    expect(enemy.height).toBe(height);
    expect(enemy.isAlive).toBe(true);
  });

  test('жизненный цикл врага', () => {
    enemy.x = -width - 10;
    enemy.update(1);

    expect(enemy.isAlive).toBe(false);
  });
});

describe('FlyingEnemy', () => {
  const gameWidth = 800;
  const gameHeight = 600;
  const width = 50;
  const height = 50;
  const gameSpeed = 5;
  const speedModifier = 2;
  const imageSrc = '../assets/flyingEnemy.png';

  const params: EnemyParams = {
    x: gameWidth,
    y: gameHeight - height,
    width,
    height,
    gameSpeed,
    speedModifier,
    imageSrc,
  };

  let enemy: FlyingEnemy;

  beforeEach(() => {
    enemy = new FlyingEnemy(params);
  });

  test('инициализация параметров врага', () => {
    expect(enemy.x).toBe(gameWidth);
    expect(enemy.y).toBe(gameHeight - height);
    expect(enemy.width).toBe(width);
    expect(enemy.height).toBe(height);
    expect(enemy.isAlive).toBe(true);
  });

  test('позиционирование врага', () => {
    enemy.update(1);

    expect(enemy.x).toBe(gameWidth - gameSpeed * speedModifier);
  });

  test('обновление угла полета врага', () => {
    const initialAngle = enemy[FlyingEnemyParams.angle];

    enemy.update(1);

    expect(enemy[FlyingEnemyParams.angle]).toBe(initialAngle + enemy[FlyingEnemyParams.vAngle]);
  });
});

describe('GroundEnemy', () => {
  const gameWidth = 800;
  const gameHeight = 600;
  const width = 50;
  const height = 50;
  const gameSpeed = 5;
  const speedModifier = 2;
  const imageSrc = '../assets/groundEnemy.png';

  const params: EnemyParams = {
    x: gameWidth,
    y: gameHeight - height,
    width,
    height,
    gameSpeed,
    speedModifier,
    imageSrc,
  };

  let enemy: GroundEnemy;

  beforeEach(() => {
    enemy = new GroundEnemy(params);
  });

  test('инициализация параметров врага', () => {
    expect(enemy.x).toBe(gameWidth);
    expect(enemy.y).toBe(gameHeight - height);
    expect(enemy.width).toBe(width);
    expect(enemy.height).toBe(height);
    expect(enemy.isAlive).toBe(true);
  });

  test('позиционирование врага', () => {
    enemy.update(1);

    expect(enemy.x).toBe(gameWidth - (gameSpeed + speedModifier));
  });
});