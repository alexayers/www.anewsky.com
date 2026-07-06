import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";
import { GameObject } from "../objects/game-object";

export const clickHandlers: Record<string, ClickHandler> = {
  "room14.grave": ({ room, self }) => {
    if (inventory.IsSelectedItem("shovel")) {
      sound_engine.PlaySound("dig");

      const middlegroundLayer = new Layer();
      middlegroundLayer.LoadImages("img/rooms/room14/room14_1mb.png");
      room.SetMiddlegroundLayer(middlegroundLayer);
      inventory.RemoveCurrentItem();

      const purpleCrystal = new GameObject("itembox");
      purpleCrystal.SetTitle("purple_crystal");
      purpleCrystal.SetFriendlyTitle("purple crystal");
      purpleCrystal.SetImage("img/objects/purple_crystal.png");

      obj_database.UpdateObject("purple_crystal", purpleCrystal);
      inventory.AddItem(purpleCrystal);

      self.Destroy();
    }
  },
};
