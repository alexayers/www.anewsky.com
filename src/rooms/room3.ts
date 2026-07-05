import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room3(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room3/room3_1b.png");
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("bad_light");

  addDoors(room);

  scene.AddBackground("Room3", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(295, 119, 350, 333);
    door1.SetDestination("Room2");
    door1.SetClickSound("unlock_door");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(158, 102, 233, 138);
    door2.SetDestination("Room31");
    door2.SetClickSound("open_toolbox");
    room.AddDoor(door2);
  }
}
