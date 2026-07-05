import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export function Room4(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room4/room4_1b.png",
    "img/rooms/room4/room4_2b.png",
    "img/rooms/room4/room4_3b.png"
  );

  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room4/room4_1m.png",
    "img/rooms/room4/room4_2m.png",
    "img/rooms/room4/room4_3m.png"
  );
  middlegroundLayer.SetAnimationRate(30);
  room.SetMiddlegroundLayer(middlegroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages(
    "img/rooms/room4/room4_1f.png",
    "img/rooms/room4/room4_2f.png",
    "img/rooms/room4/room4_3f.png"
  );

  foregroundLayer.SetAnimationRate(70);
  room.SetForegroundLayer(foregroundLayer);
  room.SetAmbient("wind");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room4", room);

  function addObjects(room: Room): void {
    const keycard = new GameObject("itembox");
    keycard.SetPosition(87, 295, 120, 317);
    keycard.SetClickSound("pickup");
    keycard.SetImage("img/objects/keycard.png");
    keycard.SetTitle("keycard");

    keycard.SetClickCallBack(() => {
      const newForeground = new Layer();
      newForeground.LoadImages(
        "img/rooms/room4/room4_1fb.png",
        "img/rooms/room4/room4_2fb.png",
        "img/rooms/room4/room4_3fb.png"
      );

      newForeground.SetAnimationRate(70);
      room.SetForegroundLayer(newForeground);

      keycard.Destroy();
    });
    obj_database.UpdateObject("keycard", keycard);
    room.AddObject(keycard);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 44, 350);
    door1.SetDestination("Room5");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(289, 0, 350, 350);
    door2.SetDestination("Room6");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(77, 140, 157, 265);
    door3.SetDestination("Room1");
    door3.SetClickSound("slide_door");
    room.AddDoor(door3);
  }
}
