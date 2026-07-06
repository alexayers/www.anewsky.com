import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";
import { GameObject } from "../objects/game-object";

export const clickHandlers: Record<string, ClickHandler> = {
  "room31.toolbox": ({ room, self }) => {
    sound_engine.PlaySound("pickup");

    const backgroundLayer = new Layer();
    backgroundLayer.LoadImages("img/rooms/room31/room31_1bb.png");
    room.SetBackgroundLayer(backgroundLayer);

    const hammer = new GameObject("itembox");
    hammer.SetImage("img/objects/hammer.png");
    hammer.SetTitle("hammer");
    obj_database.UpdateObject("hammer", hammer);
    inventory.AddItem(hammer);

    self.Destroy();
  },
};
