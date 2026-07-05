import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room33(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room33/room33_1b.png",
    "img/rooms/room33/room33_2b.png",
    "img/rooms/room33/room33_3b.png"
  );
  backgroundLayer.SetAnimationRate(30);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages("img/rooms/room33/room33_1m.png");
  room.SetMiddlegroundLayer(middlegroundLayer);

  room.SetAmbient("waves");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room33", room);

  function addObjects(room: Room): void {
    const navStorage = new GameObject("hitbox");
    navStorage.SetPosition(41, 239, 84, 302);
    navStorage.SetClickCallBack(() => {
      const storageDevice = obj_database.GetObject("storage_device");

      if (typeof storageDevice === "undefined") {
        sound_engine.PlaySound("bad_code");
      } else if (storageDevice.GetValue() === "gps_loaded") {
        sound_engine.PlaySound("good_code");
        navStorage.Destroy();
        navStorage.SetValue("ready");
        inventory.RemoveCurrentItem();

        const middlegroundLayer = new Layer();
        middlegroundLayer.LoadImages("img/rooms/room33/room33_1mb.png");
        room.SetMiddlegroundLayer(middlegroundLayer);
      } else {
        sound_engine.PlaySound("bad_code");
      }
    });

    obj_database.UpdateObject("nav_storage", navStorage);
    room.AddObject(navStorage);

    const navEnter = new GameObject("hitbox");
    navEnter.SetPosition(234, 22, 290, 257);
    navEnter.SetClickCallBack(() => {
      const navStorage = obj_database.GetObject("nav_storage");
      const sailboat = obj_database.GetObject("sailboat");

      if (navStorage.GetValue() === "ready" && sailboat.GetValue()) {
        scene.SetScene(34);
      } else {
        sound_engine.PlaySound("bad_code");
      }
    });

    obj_database.UpdateObject("nav_enter", navEnter);
    room.AddObject(navEnter);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 23, 201);
    door1.SetDestination("Room21");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(322, 0, 350, 350);
    door2.SetDestination("Room21");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(0, 307, 350, 350);
    door3.SetDestination("Room21");
    door3.SetClickSound("walk_sand");
    room.AddDoor(door3);
  }
}
