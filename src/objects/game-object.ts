// An interactive scene object: a pick-up-able "item", a clickable "hitbox",
// or an "itembox" (both). Ported from the original `Object` constructor, renamed
// to GameObject so it no longer shadows the built-in Object.
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import type { ObjectType, ClickCallback, RenderCallback } from "../engine/types";

export class GameObject {
  private x = 0;
  private y = 0;
  private height = 0;
  private width = 0;
  private title = "";
  private friendlyTitle = "";
  private clickSound = "";
  private value = "";
  private image = new Image();
  private imageInventory = new Image();
  private type: ObjectType | "" = "";
  private imageExamine = new Image();

  private isGrabbable = false;
  private isOnScreen = false;
  private isClickable = false;
  private canExamine = false;

  private clickCallback: ClickCallback | null = null;
  private renderCallback: RenderCallback | null = null;

  constructor(objectType: ObjectType) {
    this.Init(objectType);
  }

  Init(objectType: ObjectType): void {
    if (objectType === "item") {
      this.canExamine = true;
      this.isGrabbable = true;
    } else if (objectType === "hitbox") {
      this.image.src = "img/objects/nothing.png";
      this.isClickable = true;
    } else if (objectType === "itembox") {
      this.image.src = "img/objects/nothing.png";
      this.isGrabbable = true;
      this.isClickable = true;
      this.canExamine = true;
    }

    this.type = objectType;
    this.isOnScreen = true;
  }

  Render(context: CanvasRenderingContext2D): void {
    if (this.renderCallback !== null) {
      this.renderCallback();
    } else if (this.image.src !== "" && this.isOnScreen) {
      // NB: original passes (image, x, y, height, width); preserved verbatim
      // (all rendered objects are square, so the swap is a no-op).
      context.drawImage(this.image, this.x, this.y, this.height, this.width);
    }
  }

  SetTitle(str: string): void {
    this.title = str;
  }

  SetFriendlyTitle(str: string): void {
    this.friendlyTitle = str;
  }

  SetRenderCallBack(func: RenderCallback): void {
    this.renderCallback = func;
  }

  SetPosition(tX: number, tY: number, bX: number, bY: number): void {
    this.x = tX;
    this.y = tY;
    this.SetDimensions(bX - tX, bY - tY);
  }

  SetValue(str: string): void {
    this.value = str;
  }

  SetDimensions(w: number, h: number): void {
    this.height = h;
    this.width = w;
  }

  YouCanSee(): void {
    this.isOnScreen = true;
  }

  YouCanExamine(): void {
    this.canExamine = true;
  }

  YouCanPickUp(): void {
    this.isGrabbable = true;
  }

  YouCanClick(): void {
    this.isClickable = true;
  }

  YouCantClick(): void {
    this.isClickable = false;
  }

  SetImage(pngFile: string): void {
    if (this.type === "item") {
      this.image.src = pngFile;
    }

    this.imageInventory.src = pngFile;
    this.imageExamine.src = pngFile;
  }

  SetInactiveImage(pngFile: string): void {
    this.image.src = pngFile;
  }

  SetInventoryImage(pngFile: string): void {
    this.imageInventory.src = pngFile;
  }

  SetExamineImage(pngFile: string): void {
    this.imageExamine.src = pngFile;
  }

  GetImage(): HTMLImageElement {
    return this.image;
  }

  GetInventoryImage(): HTMLImageElement {
    return this.imageInventory;
  }

  GetExamineImage(): HTMLImageElement {
    return this.imageExamine;
  }

  SetClickSound(oggFile: string): void {
    this.clickSound = oggFile;
  }

  SetClickCallBack(func: ClickCallback): void {
    this.clickCallback = func;
  }

  ProcessClick(x: number, y: number): void {
    if (this.clickSound !== "") {
      sound_engine.PlaySound(this.clickSound);
    }

    if (this.isGrabbable) {
      inventory.AddItem(this);
      this.isOnScreen = false;
      this.isGrabbable = false;

      if (this.clickCallback !== null) {
        this.clickCallback(x, y);
      }
    }

    if (this.isClickable) {
      if (this.clickCallback !== null) {
        this.clickCallback(x, y);
      }
    }
  }

  IsExaminable(): boolean {
    return this.canExamine;
  }

  IsOnScreen(): boolean {
    return this.isOnScreen;
  }

  GetImageSrc(): string {
    return this.image.src;
  }

  GetX(): number {
    return this.x;
  }

  GetValue(): string {
    return this.value;
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

  GetTitle(): string {
    return this.title;
  }

  GetFriendlyTitle(): string {
    return this.friendlyTitle;
  }

  Destroy(): void {
    this.clickSound = "";
    this.isOnScreen = false;
    this.isClickable = false;
  }
}
