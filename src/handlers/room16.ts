import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export const clickHandlers: Record<string, ClickHandler> = {
  "room16.generator": ({ room }) => {
    if (inventory.IsSelectedItem("power_cell")) {
      sound_engine.PlaySound("remove_power");
      const generator = obj_database.GetObject("generator");
      generator.SetValue("powered");
      obj_database.UpdateObject("generator", generator);

      inventory.RemoveCurrentItem();

      const foregroundLayer = new Layer();
      foregroundLayer.LoadImages("img/rooms/room16/room16_1fb.png");
      room.SetForegroundLayer(foregroundLayer);

      const room24 = scene.GetRoom("Room24");
      const backgroundLayer = new Layer();
      backgroundLayer.LoadImages("img/rooms/room24/room24_1bb.png");
      room24.SetBackgroundLayer(backgroundLayer);
      scene.UpdateRoom("Room24", room24);

      const room17 = scene.GetRoom("Room17");
      const room17ForegroundLayer = new Layer();
      room17ForegroundLayer.LoadImages("img/objects/nothing.png");
      room17.SetForegroundLayer(room17ForegroundLayer);
      scene.UpdateRoom("Room17", room17);
    }
  },
};
