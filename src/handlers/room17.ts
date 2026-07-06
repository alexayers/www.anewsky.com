import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";
import { GameObject } from "../objects/game-object";

export const clickHandlers: Record<string, ClickHandler> = {
  "room17.glassdoor": ({ room, self }) => {
    const generator = obj_database.GetObject("generator");
    const power = generator.GetValue();

    if (power == "powered") {
      sound_engine.PlaySound("open_compartment");

      const foregroundLayer = new Layer();
      foregroundLayer.LoadImages("img/objects/nothing.png");
      room.SetForegroundLayer(foregroundLayer);

      const middlegroundLayer = new Layer();
      middlegroundLayer.LoadImages("img/objects/nothing.png");
      room.SetMiddlegroundLayer(middlegroundLayer);

      const pinkCrystal = new GameObject("itembox");
      pinkCrystal.SetTitle("pink_crystal");
      pinkCrystal.SetFriendlyTitle("pink crystal");
      pinkCrystal.SetImage("img/objects/pink_crystal.png");

      obj_database.UpdateObject("pink_crystal", pinkCrystal);
      inventory.AddItem(pinkCrystal);

      self.Destroy();
    } else {
      self.SetClickSound("touch_glass");
    }
  },
};
