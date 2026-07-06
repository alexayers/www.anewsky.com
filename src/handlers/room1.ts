import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database, door_database } from "../objects/object-database";
import type { ClickHandler } from "./types";

export const clickHandlers: Record<string, ClickHandler> = {
  "room1.brokenCardreader": ({ room, self }) => {
    if (inventory.IsSelectedItem("hammer")) {
      sound_engine.PlaySound("break_door");

      self.SetValue("broken");
      door_database.UnlockDoor("jaildoor_room1");
      inventory.RemoveCurrentItem();

      const newBackground = new Layer();
      newBackground.LoadImages("img/rooms/room1/room1_1bb.png");
      room.SetBackgroundLayer(newBackground);
      obj_database.UpdateObject("broken_cardreader", self);
    } else if (self.GetValue() === "broken") {
      sound_engine.PlaySound("broken_cardreader");
    } else {
      self.SetClickSound("bad_code");
    }
  },
};
