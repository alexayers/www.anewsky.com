import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room25(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room25/room25_1b.png",
    "img/rooms/room25/room25_2b.png",
    "img/rooms/room25/room25_3b.png",
    "img/rooms/room25/room25_4b.png"
  );

  backgroundLayer.SetAnimationRate(15);

  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("maproom");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room25", room);

  function addObjects(room: Room): void {
    const computer = new GameObject("hitbox");
    computer.SetPosition(53, 219, 106, 252);
    computer.SetClickSound("pick_keycard");
    computer.SetTitle("computer");

    computer.SetClickCallBack(() => {
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
    });

    obj_database.UpdateObject("computer", computer);
    room.AddObject(computer);

    const maploadEnter = new GameObject("hitbox");
    maploadEnter.SetTitle("mapload_enter");
    maploadEnter.SetPosition(240, 271, 304, 306);

    maploadEnter.SetClickCallBack(() => {
      const mappadEnter = obj_database.GetObject("mappad_enter");

      if (mappadEnter.GetValue() === "ready") {
        sound_engine.PlaySound("good_code");

        const storageDevice = obj_database.GetObject("storage_device");
        storageDevice.SetValue("gps_loaded");
        storageDevice.SetFriendlyTitle("GPS device");
        storageDevice.SetImage("img/objects/storage.png");

        obj_database.UpdateObject("storage_device", storageDevice);
        inventory.AddItem(storageDevice);

        maploadEnter.Destroy();

        const newMiddleground = new Layer();
        newMiddleground.LoadImages("img/objects/nothing.png");
        room.SetMiddlegroundLayer(newMiddleground);

        const newForeground = new Layer();
        newForeground.LoadImages("img/rooms/room25/room25_1f_storage.png");
        room.SetForegroundLayer(newForeground);
      } else {
        sound_engine.PlaySound("bad_code");
      }
    });

    obj_database.UpdateObject("mapload_enter", maploadEnter);
    room.AddObject(maploadEnter);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 47, 253);
    door1.SetDestination("Room19");
    door1.SetClickSound("walk_building");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(291, 0, 350, 249);
    door2.SetDestination("Room19");
    door2.SetClickSound("walk_building");
    room.AddDoor(door2);
  }
}
