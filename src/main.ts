// A NEW SKY — entry point. Sets up the canvas, input, the render loop, and the
// scale-aware mouse transform that lets the fixed 350x400 game fill the window.
import "./style.css";
import { scene } from "./engine/scenemgr";
import { inventory } from "./engine/inventory";
import { sound_engine } from "./engine/audio";
import { preloadImages } from "./engine/preload";
import { roomConfigs, registry } from "./data";
import { obj_database, door_database } from "./objects/object-database";
import { setCursor } from "./ui";

interface Point {
  x: number;
  y: number;
}

// Map a browser mouse event to internal (350x400) game coordinates, accounting
// for CSS scaling/letterboxing. This also fixes the original bug that swapped
// the X/Y axes (it used rect.top for X and rect.left for Y).
function toInternalCoords(canvas: HTMLCanvasElement, evt: MouseEvent): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function renderLoop(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void {
  context.clearRect(0, 0, canvas.width, canvas.height);
  scene.Render(context);
  inventory.Render(context);
  requestAnimationFrame(() => renderLoop(canvas, context));
}

function start(): void {
  const canvas = document.getElementById("Viewport") as HTMLCanvasElement | null;
  if (!canvas) {
    throw new Error("Viewport canvas not found");
  }

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("2D canvas context unavailable");
  }

  // Pixel-art: keep hard edges when the canvas is scaled up to fill the window.
  context.imageSmoothingEnabled = false;

  preloadImages();
  scene.Init(roomConfigs, registry);

  canvas.addEventListener("mousemove", (evt) => {
    const p = toInternalCoords(canvas, evt);
    setCursor(scene.MouseOver(p.x, p.y) ? "pointer" : "default");
  });

  canvas.addEventListener("mousedown", (evt) => {
    if (evt.button !== 0) {
      return; // left button only; right-click is handled by contextmenu.
    }
    const p = toInternalCoords(canvas, evt);
    scene.MouseClick(p.x, p.y);
    inventory.MouseClick(p.x, p.y, false);
  });

  canvas.addEventListener("contextmenu", (evt) => {
    evt.preventDefault();
    const p = toInternalCoords(canvas, evt);
    inventory.MouseClick(p.x, p.y, true); // right-click = examine
  });

  // Browsers block audio until the first user gesture. Re-kick the current
  // ambient loop once the player first interacts, then stop listening.
  const resumeAudio = (): void => {
    sound_engine.PlayLooped(sound_engine.GetCurrentSound());
    window.removeEventListener("pointerdown", resumeAudio);
    window.removeEventListener("keydown", resumeAudio);
  };
  window.addEventListener("pointerdown", resumeAudio);
  window.addEventListener("keydown", resumeAudio);

  // Dev-only test hook (stripped from production builds) for driving scenes
  // deterministically in automated verification.
  if (import.meta.env.DEV) {
    (window as unknown as { __game?: unknown }).__game = {
      scene,
      inventory,
      sound_engine,
      obj_database,
      door_database,
    };
  }

  renderLoop(canvas, context);
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
