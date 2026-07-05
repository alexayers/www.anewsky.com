import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room6(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room6/room6_1b.png",
    "img/rooms/room6/room6_2b.png",
    "img/rooms/room6/room6_3b.png"
  );

  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room6/room6_1m.png",
    "img/rooms/room6/room6_2m.png",
    "img/rooms/room6/room6_3m.png",
    "img/rooms/room6/room6_4m.png",
    "img/rooms/room6/room6_5m.png"
  );

  middlegroundLayer.SetAnimationRate(30);
  room.SetMiddlegroundLayer(middlegroundLayer);
  room.SetAmbient("wind");

  addDoors(room);
  scene.AddBackground("Room6", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room4");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(281, 0, 350, 350);
    door2.SetDestination("Room7");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
  }
}
