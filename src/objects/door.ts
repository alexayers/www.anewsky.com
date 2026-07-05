// A clickable region that transitions to another scene, optionally locked
// behind an inventory key item.
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { scene } from "../engine/scenemgr";
import { obj_database } from "./object-database";

export class Door {
  private x = 0;
  private y = 0;
  private width = 0;
  private height = 0;
  private title = "";
  private nextScene = 0;
  private clickSound = "";
  private isLocked = false;
  private theKey = -1;

  ProcessClick(): void {
    if (this.isLocked && inventory.GetSelectedObjId() === this.theKey) {
      this.clickSound = "unlock_door";
      this.isLocked = false;
      sound_engine.PlaySound(this.clickSound);
      inventory.RemoveItem(inventory.GetCurrentSelectedIdx());
    } else {
      if (this.clickSound !== "") {
        sound_engine.PlaySound(this.clickSound);
      }
    }

    if (!this.isLocked) {
      inventory.Deselect();
      scene.SetScene(this.nextScene);
    }
  }

  SetTitle(str: string): void {
    this.title = str;
  }

  SetPosition(tX: number, tY: number, bX: number, bY: number): void {
    this.x = tX;
    this.y = tY;
    this.SetDimensions(bX - tX, bY - tY);
  }

  SetDimensions(w: number, h: number): void {
    this.height = h;
    this.width = w;
  }

  SetDestination(destinationScene: string): void {
    this.nextScene = scene.GetSceneIdx(destinationScene);
  }

  SetClickSound(sndFile: string): void {
    this.clickSound = sndFile;
  }

  SetKey(name: string): void {
    this.theKey = obj_database.GetObjectId(name);
  }

  LockDoor(): void {
    this.isLocked = true;
  }

  UnlockDoor(): void {
    this.isLocked = false;
  }

  GetTitle(): string {
    return this.title;
  }

  GetX(): number {
    return this.x;
  }

  GetY(): number {
    return this.y;
  }

  GetHeight(): number {
    return this.height;
  }

  GetWidth(): number {
    return this.width;
  }
}
