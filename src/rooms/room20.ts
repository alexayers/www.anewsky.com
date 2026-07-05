import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room20(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room20.png");
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("waves");

  addDoors(room);
  scene.AddBackground("Room20", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room21");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(281, 0, 350, 350);
    door2.SetDestination("Room12");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(129, 0, 215, 260);
    door3.SetDestination("Room7");
    door3.SetClickSound("walk_ladder");
    room.AddDoor(door3);
  }
}
