import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export function Room28(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room28/room28_1b.png");

  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("wind");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room28", room);

  function addObjects(room: Room): void {
    const keycard = new GameObject("hitbox");
    keycard.SetPosition(74, 83, 234, 153);
    keycard.SetClickSound("pickup");
    keycard.SetImage("img/objects/keycard.png");
    keycard.SetTitle("keycard");

    keycard.SetClickCallBack(() => {
      const backgroundLayer = new Layer();
      backgroundLayer.LoadImages("img/rooms/room28/room28_1bb.png");
      room.SetMiddlegroundLayer(backgroundLayer);
      keycard.Destroy();
    });

    obj_database.UpdateObject("keycard", keycard);
    room.AddObject(keycard);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 197, 350, 350);
    door1.SetDestination("Room4");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(0, 0, 350, 66);
    door2.SetDestination("Room4");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
  }
}
