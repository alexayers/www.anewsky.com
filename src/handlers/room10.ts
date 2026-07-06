import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";

export const clickHandlers: Record<string, ClickHandler> = {
  "room10.parachute": ({ room }) => {
    const middlegroundLayer = new Layer();
    middlegroundLayer.LoadImages("img/rooms/room10/room10_no_chute_m.png");
    room.SetMiddlegroundLayer(middlegroundLayer);
  },
};
