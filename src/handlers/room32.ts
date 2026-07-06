import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";
import { GameObject } from "../objects/game-object";

export const clickHandlers: Record<string, ClickHandler> = {
  "room32.releaseStorage": ({ room, self }) => {
    self.SetValue("safely_remove");

    const backgroundLayer = new Layer();
    backgroundLayer.LoadImages("img/rooms/room32/room32_1bb.png");
    room.SetBackgroundLayer(backgroundLayer);
  },
  "room32.emptyStorage": ({ room, self }) => {
    const releaseStorage = obj_database.GetObject("release_storage");
    const value = releaseStorage.GetValue();

    if (value === "safely_remove") {
      sound_engine.PlaySound("pickup");

      const storageDevice = new GameObject("itembox");
      storageDevice.SetTitle("storage_device");
      storageDevice.SetFriendlyTitle("empty storage device");
      storageDevice.SetImage("img/objects/storage.png");
      obj_database.UpdateObject("storage_device", storageDevice);
      inventory.AddItem(storageDevice);

      self.Destroy();

      const foregroundLayer = new Layer();
      foregroundLayer.LoadImages("img/objects/nothing.png");
      room.SetForegroundLayer(foregroundLayer);
    } else {
      sound_engine.PlaySound("locked_door");
    }
  },
};
