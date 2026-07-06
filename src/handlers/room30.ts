import type { ClickHandler, RenderHandler } from "./types";
import { Layer } from "../rendering/layer";
import { sound_engine } from "../engine/audio";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export const clickHandlers: Record<string, ClickHandler> = {
  "room30.mappadEnter": ({ room, self }) => {
    const mappad = obj_database.GetObject("mappad");
    const value = mappad.GetValue().split(",");

    const currentX = value[0];
    const currentY = value[1];

    if (currentX === "4" && currentY === "3") {
      sound_engine.PlaySound("pick_keycard");

      self.SetValue("ready");
      obj_database.UpdateObject("mappad_enter", self);

      const room25 = scene.GetRoom("Room25");

      const foregroundLayer = new Layer();
      foregroundLayer.LoadImages("img/rooms/room25/room25_1f_map.png");
      room25.SetForegroundLayer(foregroundLayer);
      scene.UpdateRoom("Room25", room25);

      const backgroundLayer = new Layer();
      backgroundLayer.LoadImages("img/rooms/room30/room30_1bd.png");
      room.SetBackgroundLayer(backgroundLayer);
    } else {
      sound_engine.PlaySound("bad_code");
      self.SetValue("");
    }
  },
  "room30.mappad": ({ x, y }) => {
    const mappadEnter = obj_database.GetObject("mappad_enter");

    if (mappadEnter.GetValue() !== "ready") {
      // map is ready
      sound_engine.PlaySound("good_code");

      const mappad = obj_database.GetObject("mappad");
      const value = mappad.GetValue().split(",");

      let currentX = Number(value[0]);
      let currentY = Number(value[1]);

      if (x >= 110 && x <= 140 && y >= 308 && y <= 337) {
        if (currentY < 4) {
          currentY++;
        }
      } else if (x >= 162 && x <= 195 && y >= 308 && y <= 337) {
        if (currentY > 0) {
          currentY--;
        }
      } else if (x >= 218 && x <= 250 && y >= 308 && y <= 337) {
        if (currentX > 0) {
          currentX--;
        }
      } else if (x >= 271 && x <= 382 && y >= 308 && y <= 337) {
        if (currentX < 5) {
          currentX++;
        }
      }

      const newValue = currentX + "," + currentY;
      console.log("Setting value to " + newValue);
      mappad.SetValue(newValue);
    } else {
      sound_engine.PlaySound("bad_code");
    }
  },
};

export const renderHandlers: Record<string, RenderHandler> = {
  "room30.mappad": () => {
    const canvas = document.getElementById("Viewport") as HTMLCanvasElement | null;
    const context = canvas?.getContext("2d");
    if (!context) {
      return;
    }
    const mappad = obj_database.GetObject("mappad");
    const value = mappad.GetValue().split(",");

    const crosshair = new Image();
    crosshair.src = "img/objects/crosshair.png";

    const x = value[0];
    const y = value[1];

    let xOffset = 55;
    let yOffset = 33;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 6; c++) {
        if (c === Number(x) && r === Number(y)) {
          context.drawImage(crosshair, xOffset, yOffset, 32, 32);
        }

        xOffset += 44;
      }

      xOffset = 55;
      yOffset += 44;
    }
  },
};
