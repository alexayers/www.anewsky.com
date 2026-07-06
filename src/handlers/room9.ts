import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export const clickHandlers: Record<string, ClickHandler> = {
  "room9.pilar2": ({ room, self }) => {
    if (inventory.IsSelectedItem("purple_crystal")) {
      self.SetValue("true");
      const pilar3 = obj_database.GetObject("pilar3");

      if (pilar3.GetValue() === "true") {
        const newMiddleground = new Layer();
        newMiddleground.LoadImages(
          "img/rooms/room9/room9_1m_all.png",
          "img/rooms/room9/room9_2m_all.png",
          "img/rooms/room9/room9_3m_all.png"
        );

        newMiddleground.SetAnimationRate(30);
        room.SetMiddlegroundLayer(newMiddleground);

        const room30 = scene.GetRoom("Room30");
        const newBackground = new Layer();
        newBackground.LoadImages(
          "img/rooms/room30/room30_1bb.png",
          "img/rooms/room30/room30_1bc.png"
        );

        newBackground.SetAnimationRate(30);

        room30.SetBackgroundLayer(newBackground);
        scene.UpdateRoom("Room30", room30);
      } else {
        const newMiddleground = new Layer();
        newMiddleground.LoadImages("img/rooms/room9/room9_1m_purple.png");
        room.SetMiddlegroundLayer(newMiddleground);
      }

      obj_database.UpdateObject("pilar2", self);
      inventory.RemoveCurrentItem();
    }
  },
  "room9.pilar3": ({ room, self }) => {
    if (inventory.IsSelectedItem("pink_crystal")) {
      self.SetValue("true");
      const pilar2 = obj_database.GetObject("pilar2");

      if (pilar2.GetValue() === "true") {
        const newMiddleground = new Layer();
        newMiddleground.LoadImages(
          "img/rooms/room9/room9_1m_all.png",
          "img/rooms/room9/room9_2m_all.png",
          "img/rooms/room9/room9_3m_all.png"
        );

        newMiddleground.SetAnimationRate(30);

        room.SetMiddlegroundLayer(newMiddleground);

        const room30 = scene.GetRoom("Room30");
        const newBackground = new Layer();
        newBackground.LoadImages(
          "img/rooms/room30/room30_1bb.png",
          "img/rooms/room30/room30_1bc.png"
        );

        newBackground.SetAnimationRate(30);

        room30.SetBackgroundLayer(newBackground);
        scene.UpdateRoom("Room30", room30);
      } else {
        const newMiddleground = new Layer();
        newMiddleground.LoadImages("img/rooms/room9/room9_1m_pink.png");
        room.SetMiddlegroundLayer(newMiddleground);
      }

      obj_database.UpdateObject("pilar3", self);
      inventory.RemoveCurrentItem();
    }
  },
};
