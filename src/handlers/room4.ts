import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";

export const clickHandlers: Record<string, ClickHandler> = {
  "room4.keycard": ({ room, self }) => {
    const newForeground = new Layer();
    newForeground.LoadImages(
      "img/rooms/room4/room4_1fb.png",
      "img/rooms/room4/room4_2fb.png",
      "img/rooms/room4/room4_3fb.png"
    );

    newForeground.SetAnimationRate(70);
    room.SetForegroundLayer(newForeground);

    self.Destroy();
  },
};
