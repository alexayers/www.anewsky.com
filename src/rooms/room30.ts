import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room30(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room30/room30_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.SetAnimationRate(15);
  middlegroundLayer.LoadImages(
    "img/rooms/room30/room30_1m.png",
    "img/rooms/room30/room30_2m.png",
    "img/rooms/room30/room30_3m.png",
    "img/rooms/room30/room30_4m.png"
  );

  room.SetMiddlegroundLayer(middlegroundLayer);
  room.SetAmbient("maproom");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room30", room);

  function addObjects(room: Room): void {
    const mappadEnter = new GameObject("hitbox");
    mappadEnter.SetClickSound("computer_walk");
    mappadEnter.SetPosition(12, 305, 74, 339);
    mappadEnter.SetTitle("mappad_enter");

    mappadEnter.SetClickCallBack(() => {
      const mappad = obj_database.GetObject("mappad");
      const value = mappad.GetValue().split(",");

      const currentX = value[0];
      const currentY = value[1];

      if (currentX === "4" && currentY === "3") {
        sound_engine.PlaySound("pick_keycard");

        mappadEnter.SetValue("ready");
        obj_database.UpdateObject("mappad_enter", mappadEnter);

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
        mappadEnter.SetValue("");
      }
    });

    // NOTE: the original ES5 registered `keypad_enter` here, an undeclared
    // global typo for `mappad_enter`; corrected so it type-checks and behaves
    // as clearly intended.
    obj_database.UpdateObject("mappad_enter", mappadEnter);
    room.AddObject(mappadEnter);

    const mappad = new GameObject("hitbox");
    mappad.SetClickSound("computer_type");
    mappad.SetPosition(107, 297, 315, 337);
    mappad.SetTitle("mappad");
    mappad.SetValue("0,0");

    mappad.SetClickCallBack((x, y) => {
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
    });

    mappad.SetRenderCallBack(() => {
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
    });

    obj_database.UpdateObject("mappad", mappad);
    room.AddObject(mappad);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetClickSound("walk_computer");
    door1.SetDestination("Room19");
    door1.SetPosition(0, 0, 47, 296);
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetClickSound("walk_computer");
    door2.SetDestination("Room19");
    door2.SetPosition(291, 0, 350, 296);
    room.AddDoor(door2);
  }
}
