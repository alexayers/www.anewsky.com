import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room23(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room23/room23_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room23/room23_1m.png",
    "img/rooms/room23/room23_2m.png",
    "img/rooms/room23/room23_3m.png",
    "img/rooms/room23/room23_4m.png",
    "img/rooms/room23/room23_4m.png",
    "img/rooms/room23/room23_4m.png",
    "img/rooms/room23/room23_4m.png",
    "img/rooms/room23/room23_4m.png",
    "img/rooms/room23/room23_4m.png"
  );

  middlegroundLayer.SetAnimationRate(10);
  room.SetMiddlegroundLayer(middlegroundLayer);
  room.SetAmbient("waves");

  addDoors(room);
  scene.AddBackground("Room23", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 350, 187);
    door1.SetDestination("Room12");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(210, 261, 350, 350);
    door2.SetDestination("Room12");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(0, 196, 65, 233);
    door3.SetDestination("Room26");
    door3.SetClickSound("walk_computer");
    room.AddDoor(door3);
  }
}
