import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { door_database } from "../objects/object-database";

export const clickHandlers: Record<string, ClickHandler> = {
  "room5.cardreader": ({ room }) => {
    if (inventory.IsSelectedItem("keycard")) {
      console.log("Trying to unlock door.");
      door_database.UnlockDoor("mapdoor_room5");

      const newMiddleground = new Layer();
      newMiddleground.LoadImages(
        "img/rooms/room5/room5_1mb.png",
        "img/rooms/room5/room5_2mb.png"
      );
      newMiddleground.SetAnimationRate(70);
      room.SetMiddlegroundLayer(newMiddleground);
      inventory.RemoveCurrentItem();
    }
  },
};
