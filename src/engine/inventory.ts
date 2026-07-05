// The player's inventory: a row of item slots along the bottom bar, with
// left-click to select and right-click to examine (close-up view).
import { sound_engine } from "./audio";
import { obj_database } from "../objects/object-database";
import { GAME_HEIGHT, INTERNAL_WIDTH, INVENTORY_BAR_HEIGHT, MAX_INVENTORY } from "./constants";
import type { GameObject } from "../objects/game-object";

class Inventory {
  private slots: (GameObject | null)[] = [];
  private currentSelected = -1;
  private readonly xOffset = 30;
  private readonly yOffset = 360;
  private readonly slotSpacing = 50;
  private readonly iconSize = 32;
  private highlight = new Image();
  private isExamining = false;
  private showCloseUp = false;

  Init(): void {
    this.highlight.src = "img/objects/highlight.png";

    for (let i = 0; i < MAX_INVENTORY; i++) {
      this.slots[i] = null;
    }
  }

  MouseClick(x: number, y: number, lookAt: boolean): void {
    let thisXOffset = this.xOffset;

    this.isExamining = lookAt;

    for (let i = 0; i < MAX_INVENTORY; i++) {
      const slot = this.slots[i];
      if (slot !== null) {
        if (
          x >= thisXOffset &&
          x <= thisXOffset + this.iconSize &&
          y >= this.yOffset &&
          y <= this.yOffset + this.iconSize
        ) {
          if (this.currentSelected === i) {
            this.Deselect();
          } else {
            this.currentSelected = i;
          }

          sound_engine.PlaySound("inventory_click");

          if (this.isExamining) {
            this.showCloseUp = true;
          }
        }
      }

      thisXOffset += this.slotSpacing;
    }
  }

  AddItem(object: GameObject): void {
    let thisXOffset = this.xOffset;

    for (let i = 0; i < MAX_INVENTORY; i++) {
      if (this.slots[i] === null) {
        this.slots[i] = object;
        object.SetPosition(
          thisXOffset,
          this.yOffset,
          thisXOffset + this.iconSize,
          this.yOffset + this.iconSize
        );
        return;
      }

      thisXOffset += this.slotSpacing;
    }

    console.log("Failed to add any items");
  }

  Render(context: CanvasRenderingContext2D): void {
    context.fillStyle = "#000000";
    context.fillRect(0, GAME_HEIGHT, INTERNAL_WIDTH, INVENTORY_BAR_HEIGHT);

    for (let i = 0; i < MAX_INVENTORY; i++) {
      const slot = this.slots[i];
      if (slot === null) {
        continue;
      }

      context.drawImage(
        slot.GetInventoryImage(),
        slot.GetX(),
        slot.GetY(),
        this.iconSize,
        this.iconSize
      );

      if (i === this.currentSelected) {
        context.drawImage(this.highlight, slot.GetX(), slot.GetY(), this.iconSize, this.iconSize);

        if (this.showCloseUp) {
          context.fillStyle = "#000000";
          context.globalAlpha = 0.6;
          context.fillRect(0, 0, INTERNAL_WIDTH, GAME_HEIGHT);
          context.globalAlpha = 1.0;
          context.drawImage(slot.GetExamineImage(), 50, 50, 250, 250);

          context.fillStyle = "white";
          context.textAlign = "center";
          context.font = "bold 20px Terminal";

          if (slot.GetFriendlyTitle() !== "") {
            context.fillText(slot.GetFriendlyTitle(), 175, 320);
          } else {
            context.fillText(slot.GetTitle(), 175, 320);
          }
        }
      }
    }
  }

  RemoveCurrentItem(): void {
    this.RemoveItem(this.GetCurrentSelectedIdx());
  }

  GetCurrentItemImage(): HTMLImageElement {
    return this.slots[this.currentSelected]!.GetImage();
  }

  RemoveItem(idx: number): void {
    this.slots[idx] = null;
    this.currentSelected = -1;
  }

  Deselect(): void {
    this.currentSelected = -1;
  }

  GetSelectedObjId(): number {
    if (this.currentSelected !== -1) {
      return obj_database.GetObjectId(this.slots[this.currentSelected]!.GetTitle());
    }
    return -1;
  }

  GetCurrentSelectedIdx(): number {
    return this.currentSelected;
  }

  StopExamining(): void {
    this.showCloseUp = false;
  }

  IsSelectedItem(name: string): boolean {
    return this.GetSelectedObjId() === obj_database.GetObjectId(name);
  }

  IsExamining(): boolean {
    return this.isExamining;
  }
}

export const inventory = new Inventory();
inventory.Init();
