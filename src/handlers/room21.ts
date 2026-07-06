import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";

export const clickHandlers: Record<string, ClickHandler> = {
  "room21.sailboat": ({ room, self }) => {
    if (inventory.IsSelectedItem("parachute")) {
      sound_engine.PlaySound("sail");
      self.SetValue("ready");

      const newForeground = new Layer();
      newForeground.LoadImages(
        "img/rooms/room21/room21_1fb.png",
        "img/rooms/room21/room21_2fb.png",
        "img/rooms/room21/room21_3fb.png",
        "img/rooms/room21/room21_2fb.png"
      );

      newForeground.SetAnimationRate(20);
      room.SetForegroundLayer(newForeground);
      inventory.RemoveCurrentItem();
    }
  },
};
