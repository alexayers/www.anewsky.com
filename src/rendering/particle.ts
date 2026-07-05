// Particle effects (smoke, sparks). Ported from the original for completeness;
// not currently wired into any room. The original checked a misspelled
// `lifeimage` property so particles never recycled — fixed here to `lifetime`.

class Particle {
  x = 0;
  y = 0;
  speedX = 0;
  speedY = 0;
  decayRate = 0;
  lifetime = 0;
}

abstract class BaseParticleSystem {
  protected particleMap: Particle[] = [];
  protected totalParticles = 0;
  protected image = new Image();
  protected drawSize: number;

  protected constructor(imageSrc: string, drawSize: number) {
    this.image.src = imageSrc;
    this.drawSize = drawSize;
  }

  Create(total: number): void {
    this.totalParticles = total;
    this.particleMap = new Array<Particle>(total);

    for (let i = 0; i < this.totalParticles; i++) {
      this.Refresh(i);
    }
  }

  Refresh(particleId: number): void {
    const particle = new Particle();
    particle.x = Math.floor(Math.random() * 350 + 1);
    particle.y = 0;
    particle.speedX = Math.random();

    if (Math.floor(Math.random() * 2 + 1) === 2) {
      particle.speedX *= -1;
    }

    particle.speedY = Math.random();
    particle.decayRate = Math.random();
    particle.lifetime = Math.floor(Math.random() * 10 + 1);

    this.particleMap[particleId] = particle;
  }

  Render(context: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.totalParticles; i++) {
      const particle = this.particleMap[i];
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.lifetime -= particle.decayRate;

      if (particle.lifetime <= 0 || particle.x >= 350 || particle.x < 0 || particle.y >= 350) {
        this.Refresh(i);
      }

      context.drawImage(this.image, particle.x, particle.y, this.drawSize, this.drawSize);
    }
  }
}

export class SmokeParticle extends BaseParticleSystem {
  constructor() {
    super("img/particles/smoke.png", 32);
  }
}

export class ParticleSystem extends BaseParticleSystem {
  constructor() {
    super("img/particles/particle.png", 6);
  }
}
