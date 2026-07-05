// A single game scene: layered backdrops, interactive objects, and doors.
import { Layer } from "../rendering/layer";
import { sound_engine } from "./audio";
import { inventory } from "./inventory";
import { GAME_HEIGHT } from "./constants";
import type { GameObject } from "../objects/game-object";
import type { Door } from "../objects/door";
import type { OneTimeCallback } from "./types";

export class Room {
  title = "";
  private background: Layer = new Layer();
  private middleground: Layer = new Layer();
  private foreground: Layer = new Layer();
  private ambience = "";
  private objectMap: GameObject[] = [];
  private doorMap: Door[] = [];
  private oneTimeCallback: OneTimeCallback | null = null;

  Init(): void {
    // empty.
  }

  SetOneTimeCallBack(func: OneTimeCallback): void {
    this.oneTimeCallback = func;
  }

  Render(context: CanvasRenderingContext2D): void {
    if (this.background.IsSet()) {
      context.drawImage(this.background.GetCurrentFrame(), 0, 0, GAME_HEIGHT, GAME_HEIGHT);
      this.background.NextFrame();
    }

    if (this.middleground.IsSet()) {
      context.drawImage(this.middleground.GetCurrentFrame(), 0, 0, GAME_HEIGHT, GAME_HEIGHT);
      this.middleground.NextFrame();
    }

    for (const object of this.objectMap) {
      object.Render(context);
    }

    if (this.foreground.IsSet()) {
      context.drawImage(this.foreground.GetCurrentFrame(), 0, 0, GAME_HEIGHT, GAME_HEIGHT);
      this.foreground.NextFrame();
    }

    this.OneTimeCallBack();
  }

  SetTitle(myTitle: string): void {
    this.title = myTitle;
  }

  SetBackgroundLayer(layer: Layer): void {
    this.background = layer;
  }

  SetMiddlegroundLayer(layer: Layer): void {
    this.middleground = layer;
  }

  SetForegroundLayer(layer: Layer): void {
    this.foreground = layer;
  }

  PlayBackgroundLayer(): void {
    this.background.StartAnimation();
  }

  PlayMiddlegroundLayer(): void {
    this.middleground.StartAnimation();
  }

  PlayForegroundLayer(): void {
    this.foreground.StartAnimation();
  }

  SetAmbient(sndFile: string): void {
    sound_engine.Set(sndFile);
    this.ambience = sndFile;
  }

  GetAmbience(): string {
    return this.ambience;
  }

  AddObject(object: GameObject): void {
    this.objectMap.push(object);
  }

  AddDoor(door: Door): void {
    this.doorMap.push(door);
  }

  ProcessMouseOver(x: number, y: number): boolean {
    if (inventory.IsExamining()) {
      return true;
    }

    for (const object of this.objectMap) {
      if (object.IsOnScreen()) {
        if (
          x >= object.GetX() &&
          x <= object.GetX() + object.GetWidth() &&
          y >= object.GetY() &&
          y <= object.GetY() + object.GetHeight()
        ) {
          return true;
        }
      }
    }

    for (const door of this.doorMap) {
      if (
        x >= door.GetX() &&
        x <= door.GetX() + door.GetWidth() &&
        y >= door.GetY() &&
        y <= door.GetY() + door.GetHeight()
      ) {
        return true;
      }
    }

    return false;
  }

  ProcessMouseClick(x: number, y: number): void {
    if (inventory.IsExamining()) {
      inventory.StopExamining();
      return;
    }

    for (const object of this.objectMap) {
      if (object.IsOnScreen()) {
        if (
          x >= object.GetX() &&
          x <= object.GetX() + object.GetWidth() &&
          y >= object.GetY() &&
          y <= object.GetY() + object.GetHeight()
        ) {
          object.ProcessClick(x, y);
          return;
        }
      }
    }

    for (const door of this.doorMap) {
      if (
        x >= door.GetX() &&
        x <= door.GetX() + door.GetWidth() &&
        y >= door.GetY() &&
        y <= door.GetY() + door.GetHeight()
      ) {
        door.ProcessClick();
        return;
      }
    }
  }

  OneTimeCallBack(): void {
    if (this.oneTimeCallback !== null) {
      const callback = this.oneTimeCallback;
      this.oneTimeCallback = null;
      callback();
    }
  }
}
