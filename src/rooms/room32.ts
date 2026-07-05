import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room32(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room32/room32_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages("img/rooms/room32/room32_1f.png");
  room.SetForegroundLayer(foregroundLayer);

  room.SetAmbient("cave");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room32", room);

  function addObjects(room: Room): void {
    const releaseStorage = new GameObject("hitbox");
    releaseStorage.SetTitle("release_storage");
    releaseStorage.SetPosition(249, 247, 320, 284);
    releaseStorage.SetClickSound("good_code");
    releaseStorage.SetClickCallBack(() => {
      releaseStorage.SetValue("safely_remove");

      const backgroundLayer = new Layer();
      backgroundLayer.LoadImages("img/rooms/room32/room32_1bb.png");
      room.SetBackgroundLayer(backgroundLayer);
    });

    room.AddObject(releaseStorage);
    obj_database.UpdateObject("release_storage", releaseStorage);

    const emptyStorage = new GameObject("hitbox");
    emptyStorage.SetTitle("empty_storage");
    emptyStorage.SetPosition(72, 188, 115, 246);

    emptyStorage.SetClickCallBack(() => {
      const releaseStorage = obj_database.GetObject("release_storage");
      const value = releaseStorage.GetValue();

      if (value === "safely_remove") {
        sound_engine.PlaySound("pickup");

        const storageDevice = new GameObject("itembox");
        storageDevice.SetTitle("storage_device");
        storageDevice.SetFriendlyTitle("empty storage device");
        storageDevice.SetImage("img/objects/storage.png");
        obj_database.UpdateObject("storage_device", storageDevice);
        inventory.AddItem(storageDevice);

        emptyStorage.Destroy();

        const foregroundLayer = new Layer();
        foregroundLayer.LoadImages("img/objects/nothing.png");
        room.SetForegroundLayer(foregroundLayer);
      } else {
        sound_engine.PlaySound("locked_door");
      }
    });

    room.AddObject(emptyStorage);
    obj_database.UpdateObject("empty_storage", emptyStorage);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 41, 240);
    door1.SetDestination("Room24");
    door1.SetClickSound("walk_computer");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(270, 0, 350, 230);
    door2.SetDestination("Room24");
    door2.SetClickSound("walk_computer");
    room.AddDoor(door2);
  }
}
