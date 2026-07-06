import { scene } from "../engine/scenemgr";
import { sound_engine } from "../engine/audio";
import {
  setSubtitleText,
  setMaintitleText,
  setSubtitleVisible,
  setMaintitleVisible,
} from "../ui";
import type { OneTimeHandler } from "./types";

// The intro cutscene: a black screen with narrated subtitles over the
// "badlanding" audio, then it advances to Room1.
const intro: OneTimeHandler = () => {
  setSubtitleText("");
  setMaintitleText("");

  const audioCodec = sound_engine.GetAudioCodec();
  const buffer = new Audio("audio/" + audioCodec + "/badlanding." + audioCodec);
  void buffer.play().catch(() => undefined);

  let advanced = false;
  const advance = (): void => {
    if (advanced) {
      return;
    }
    advanced = true;
    buffer.pause();
    setSubtitleText("");
    setSubtitleVisible(false);
    setMaintitleVisible(false);
    scene.SetScene(1);
  };

  buffer.addEventListener("ended", advance);
  // Safety net: if audio playback is blocked (autoplay policy) or "ended"
  // never fires, advance anyway so the intro can't soft-lock the game.
  window.setTimeout(advance, 18000);

  buffer.addEventListener("timeupdate", function (this: HTMLAudioElement) {
    const t = this.currentTime;
    if (t >= 0 && t <= 2) {
      setSubtitleVisible(true);
      setMaintitleVisible(true);
    } else if (t >= 5 && t <= 7) {
      setSubtitleVisible(true);
      setMaintitleVisible(true);
      setSubtitleText("As far as I'm concerned...");
    } else if (t >= 3 && t <= 4 && t >= 7 && t <= 8 && t >= 12 && t <= 13) {
      setSubtitleText("");
    } else if (t > 9 && t <= 11) {
      setSubtitleVisible(true);
      setMaintitleVisible(true);
      setSubtitleText("that son of a bitch had it coming...");
    } else if (t > 14 && t <= 17) {
      setMaintitleText("A NEW SKY");
      setSubtitleVisible(true);
      setMaintitleVisible(true);
    } else {
      setSubtitleText("");
      setMaintitleText("");
      setSubtitleVisible(false);
      setMaintitleVisible(false);
    }
  });
};

export const oneTimeHandlers: Record<string, OneTimeHandler> = {
  "room0.intro": intro,
};
