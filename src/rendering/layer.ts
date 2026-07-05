// A drawable image layer that optionally cycles through animation frames.
export class Layer {
  private animationRate = 0;
  private animationTick = 0;
  private animationMap: HTMLImageElement[] | undefined;
  private frameIdx = 0;
  private loop = true;
  private isPlaying = true;

  GetCurrentFrame(): HTMLImageElement {
    return this.animationMap![this.frameIdx];
  }

  SetAnimationRate(rate: number): void {
    this.animationRate = rate;
  }

  LoadImages(...srcs: string[]): void {
    this.animationMap = new Array<HTMLImageElement>(srcs.length);
    for (let i = 0; i < srcs.length; i++) {
      const img = new Image();
      img.onerror = () => console.error("Failed to load image: " + img.src);
      img.src = srcs[i];
      this.animationMap[i] = img;
    }
  }

  IsSet(): boolean {
    return this.animationMap !== undefined;
  }

  NextFrame(): void {
    if (!this.isPlaying || this.animationMap === undefined) {
      return;
    }

    this.animationTick++;

    if (this.animationTick === this.animationRate) {
      this.animationTick = 0;

      if (this.frameIdx === this.animationMap.length - 1) {
        if (this.loop) {
          this.frameIdx = 0;
        }
      } else {
        this.frameIdx++;
      }
    }
  }

  StartAnimation(): void {
    this.isPlaying = true;
  }

  DoNotAutoPlay(): void {
    this.isPlaying = false;
  }

  DoNotLoop(): void {
    this.loop = false;
  }
}
