// Sound engine. One-shot effects create a throwaway Audio element; ambient
// tracks reuse a per-track looping Audio element.
//
// This replaces the original fragile two-buffer manual looping (which leaked
// "ended" listeners and had a duplicate Stop() definition) with the native
// HTMLAudioElement `loop` flag.
class SoundEngine {
  private audioCodec = "";
  private mute = false;
  private loops = new Map<string, HTMLAudioElement>();
  private currentSound = "";

  constructor() {
    this.Init();
  }

  Init(): void {
    this.GetAudioCodec();
  }

  GetAudioCodec(): string {
    const audio = new Audio();
    this.audioCodec = audio.canPlayType("audio/ogg") ? "ogg" : "mp3";
    return this.audioCodec;
  }

  MuteSound(): void {
    this.mute = !this.mute;
  }

  OnMute(): boolean {
    return this.mute;
  }

  private srcFor(sndFile: string): string {
    return "audio/" + this.audioCodec + "/" + sndFile + "." + this.audioCodec;
  }

  Set(sndFile: string): void {
    if (sndFile === "" || this.loops.has(sndFile)) {
      return;
    }

    const audio = new Audio(this.srcFor(sndFile));
    audio.loop = true;
    // Load lazily on first play; every room registers its ambient up front, so
    // eager loading would kick off dozens of parallel fetches (most aborted).
    audio.preload = "none";
    audio.onerror = () => console.error("Failed to load audio: " + audio.src);
    this.loops.set(sndFile, audio);
  }

  GetCurrentSound(): string {
    return this.currentSound;
  }

  PlaySound(sndFile: string): void {
    if (this.OnMute() || sndFile === "") {
      return;
    }

    const audio = new Audio(this.srcFor(sndFile));
    // Autoplay may be blocked until the first user gesture; ignore rejection.
    void audio.play().catch(() => undefined);
  }

  PlayLooped(sndFile: string): void {
    this.currentSound = sndFile;

    if (this.OnMute() || sndFile === "") {
      return;
    }

    const audio = this.loops.get(sndFile);
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => undefined);
    }
  }

  // Stops the currently playing ambient loop. The optional channel argument is
  // accepted for call-site compatibility; the original always stopped the
  // current track regardless of the value passed.
  Stop(channel?: string): void {
    const key = channel && this.loops.has(channel) ? channel : this.currentSound;
    const audio = this.loops.get(key);
    if (audio) {
      audio.pause();
    }
  }
}

export const sound_engine = new SoundEngine();
