import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { obj_database } from "../objects/object-database";
import { GameObject } from "../objects/game-object";

export const clickHandlers: Record<string, ClickHandler> = {
  "room29.trunk": ({ room, self }) => {
    const middlegroundLayer = new Layer();
    middlegroundLayer.LoadImages("img/objects/nothing.png");
    middlegroundLayer.SetAnimationRate(70);
    room.SetMiddlegroundLayer(middlegroundLayer);

    const powerCell = new GameObject("item");
    powerCell.SetTitle("power_cell");
    powerCell.SetFriendlyTitle("power cell");
    powerCell.SetImage("img/objects/power_cell.png");
    obj_database.UpdateObject("power_cell", powerCell);
    inventory.AddItem(powerCell);

    self.Destroy();
  },
};
