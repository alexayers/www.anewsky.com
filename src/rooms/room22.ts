import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";
import { door_database } from "../objects/object-database";

export function Room22(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room22.png");
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("waves");
  addDoors(room);

  scene.AddBackground("Room22", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 350, 350);
    door1.SetDestination("Room12");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(0, 0, 350, 350);
    door2.SetDestination("Room29");
    door2.LockDoor();
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
    door_database.UpdateDoor("energydoor_room22", door2);
  }
}
