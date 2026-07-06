import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export const clickHandlers: Record<string, ClickHandler> = {
  "room33.navStorage": ({ room, self }) => {
    const storageDevice = obj_database.GetObject("storage_device");

    if (typeof storageDevice === "undefined") {
      sound_engine.PlaySound("bad_code");
    } else if (storageDevice.GetValue() === "gps_loaded") {
      sound_engine.PlaySound("good_code");
      self.Destroy();
      self.SetValue("ready");
      inventory.RemoveCurrentItem();

      const middlegroundLayer = new Layer();
      middlegroundLayer.LoadImages("img/rooms/room33/room33_1mb.png");
      room.SetMiddlegroundLayer(middlegroundLayer);
    } else {
      sound_engine.PlaySound("bad_code");
    }
  },
  "room33.navEnter": () => {
    const navStorage = obj_database.GetObject("nav_storage");
    const sailboat = obj_database.GetObject("sailboat");

    if (navStorage.GetValue() === "ready" && sailboat.GetValue()) {
      scene.SetScene(34);
    } else {
      sound_engine.PlaySound("bad_code");
    }
  },
};
