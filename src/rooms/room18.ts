import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { obj_database } from "../objects/object-database";

export function Room18(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room18/room18_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room18/room18_1m.png",
    "img/rooms/room18/room18_2m.png",
    "img/rooms/room18/room18_3m.png",
    "img/rooms/room18/room18_4m.png",
    "img/rooms/room18/room18_3m.png",
    "img/rooms/room18/room18_2m.png"
  );

  middlegroundLayer.SetAnimationRate(20);
  room.SetMiddlegroundLayer(middlegroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages("img/rooms/room18/room18_1f.png");
  room.SetForegroundLayer(foregroundLayer);

  room.SetAmbient("maproom");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room18", room);

  function addObjects(room: Room): void {
    const wallShovel = new GameObject("hitbox");
    wallShovel.SetClickSound("pickup");
    wallShovel.SetPosition(90, 183, 118, 269);
    wallShovel.SetTitle("wall_shovel");
    wallShovel.SetClickCallBack(() => {
      const foregroundLayer = new Layer();
      foregroundLayer.LoadImages("img/objects/nothing.png");
      room.SetForegroundLayer(foregroundLayer);

      const shovel = new GameObject("itembox");
      shovel.SetTitle("shovel");
      shovel.SetImage("img/objects/shovel.png");
      obj_database.UpdateObject("shovel", shovel);
      inventory.AddItem(shovel);

      wallShovel.Destroy();
    });

    obj_database.UpdateObject("wall_shovel", wallShovel);
    room.AddObject(wallShovel);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(286, 0, 350, 350);
    door1.SetDestination("Room19");
    door1.SetClickSound("walk_building");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(131, 142, 248, 267);
    door2.SetDestination("Room5");
    door2.SetClickSound("slide_door");
    room.AddDoor(door2);
  }
}
