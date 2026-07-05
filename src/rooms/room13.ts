import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room13(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room13/room13_1b.png");
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("waves");

  addDoors(room);

  scene.AddBackground("Room13", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room12");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(283, 0, 350, 350);
    door2.SetDestination("Room14");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(114, 88, 265, 257);
    door3.SetDestination("Room15");
    door3.SetClickSound("walk_sand");
    room.AddDoor(door3);
  }
}
