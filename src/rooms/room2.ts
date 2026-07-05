import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room2(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room2/room2_1b.png");
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("bad_light");

  addDoors(room);

  scene.AddBackground("Room2", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(298, 0, 350, 350);
    door1.SetDestination("Room1");
    door1.SetClickSound("walk_building");
    door1.SetTitle("Prison Door");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(0, 121, 50, 333);
    door2.SetDestination("Room3");
    door2.SetTitle("Closet door");
    door2.SetClickSound("key_locked");
    door2.LockDoor();
    door2.SetKey("key");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(154, 201, 242, 267);
    door3.SetDestination("Room27");
    door3.SetTitle("Bed");
    door3.SetClickSound("walk_building");
    room.AddDoor(door3);
  }
}
