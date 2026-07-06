import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { obj_database } from "../objects/object-database";
import { GameObject } from "../objects/game-object";

export const clickHandlers: Record<string, ClickHandler> = {
  "room18.wallShovel": ({ room, self }) => {
    const foregroundLayer = new Layer();
    foregroundLayer.LoadImages("img/objects/nothing.png");
    room.SetForegroundLayer(foregroundLayer);

    const shovel = new GameObject("itembox");
    shovel.SetTitle("shovel");
    shovel.SetImage("img/objects/shovel.png");
    obj_database.UpdateObject("shovel", shovel);
    inventory.AddItem(shovel);

    self.Destroy();
  },
};
