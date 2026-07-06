import type { ClickHandler } from "./types";
import { Layer } from "../rendering/layer";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export const clickHandlers: Record<string, ClickHandler> = {
  "room25.computer": ({ room }) => {
    if (inventory.IsSelectedItem("storage_device")) {
      const newBackground = new Layer();
      newBackground.LoadImages(
        "img/rooms/room25/room25_1bb.png",
        "img/rooms/room25/room25_2bb.png",
        "img/rooms/room25/room25_3bb.png",
        "img/rooms/room25/room25_4bb.png"
      );

      newBackground.SetAnimationRate(15);
      room.SetBackgroundLayer(newBackground);

      const newMiddleground = new Layer();
      newMiddleground.LoadImages("img/rooms/room25/room25_1m.png");
      room.SetMiddlegroundLayer(newMiddleground);

      const mappadEnter = obj_database.GetObject("mappad_enter");

      let foregroundImages: string;
      if (mappadEnter.GetValue() === "ready") {
        // map is ready
        foregroundImages = "img/rooms/room25/room25_1f_map.png";
      } else {
        // map isn't ready
        foregroundImages = "img/rooms/room25/room25_1f.png";
      }

      const newForeground = new Layer();
      newForeground.LoadImages(foregroundImages);
      room.SetForegroundLayer(newForeground);

      inventory.RemoveCurrentItem();
    }
  },
  "room25.maploadEnter": ({ room, self }) => {
    const mappadEnter = obj_database.GetObject("mappad_enter");

    if (mappadEnter.GetValue() === "ready") {
      sound_engine.PlaySound("good_code");

      const storageDevice = obj_database.GetObject("storage_device");
      storageDevice.SetValue("gps_loaded");
      storageDevice.SetFriendlyTitle("GPS device");
      storageDevice.SetImage("img/objects/storage.png");

      obj_database.UpdateObject("storage_device", storageDevice);
      inventory.AddItem(storageDevice);

      self.Destroy();

      const newMiddleground = new Layer();
      newMiddleground.LoadImages("img/objects/nothing.png");
      room.SetMiddlegroundLayer(newMiddleground);

      const newForeground = new Layer();
      newForeground.LoadImages("img/rooms/room25/room25_1f_storage.png");
      room.SetForegroundLayer(newForeground);
    } else {
      sound_engine.PlaySound("bad_code");
    }
  },
};
