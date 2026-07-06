import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";

export const clickHandlers: Record<string, ClickHandler> = {
  "room27.photo": ({ room }) => {
    const newBackground = new Layer();
    newBackground.LoadImages("img/rooms/room27/room27_1bb.png");
    room.SetMiddlegroundLayer(newBackground);
  },
};
