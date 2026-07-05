import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room21(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room21/room21_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room21/room21_1m.png",
    "img/rooms/room21/room21_2m.png",
    "img/rooms/room21/room21_3m.png",
    "img/rooms/room21/room21_4m.png",
    "img/rooms/room21/room21_3m.png",
    "img/rooms/room21/room21_2m.png"
  );

  middlegroundLayer.SetAnimationRate(50);
  room.SetMiddlegroundLayer(middlegroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages(
    "img/rooms/room21/room21_1f.png",
    "img/rooms/room21/room21_2f.png",
    "img/rooms/room21/room21_3f.png",
    "img/rooms/room21/room21_2f.png"
  );

  foregroundLayer.SetAnimationRate(20);

  room.SetForegroundLayer(foregroundLayer);
  room.SetAmbient("waves");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room21", room);

  function addObjects(room: Room): void {
    const sailboat = new GameObject("hitbox");
    sailboat.SetPosition(98, 61, 226, 279);
    sailboat.SetTitle("sailboat");

    sailboat.SetClickCallBack(() => {
      if (inventory.IsSelectedItem("parachute")) {
        sound_engine.PlaySound("sail");
        sailboat.SetValue("ready");

        const newForeground = new Layer();
        newForeground.LoadImages(
          "img/rooms/room21/room21_1fb.png",
          "img/rooms/room21/room21_2fb.png",
          "img/rooms/room21/room21_3fb.png",
          "img/rooms/room21/room21_2fb.png"
        );

        newForeground.SetAnimationRate(20);
        room.SetForegroundLayer(newForeground);
        inventory.RemoveCurrentItem();
      }
    });

    obj_database.UpdateObject("sailboat", sailboat);
    room.AddObject(sailboat);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(297, 0, 350, 350);
    door1.SetDestination("Room20");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(250, 152, 288, 219);
    door2.SetDestination("Room33");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
  }
}
