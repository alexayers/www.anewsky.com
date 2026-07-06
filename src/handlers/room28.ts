import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";

export const clickHandlers: Record<string, ClickHandler> = {
  "room28.keycard": ({ room, self }) => {
    const backgroundLayer = new Layer();
    backgroundLayer.LoadImages("img/rooms/room28/room28_1bb.png");
    room.SetMiddlegroundLayer(backgroundLayer);
    self.Destroy();
  },
};
