import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room8(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room8/room8_1b.png",
    "img/rooms/room8/room8_2b.png",
    "img/rooms/room8/room8_3b.png"
  );

  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room8/room8_1m.png",
    "img/rooms/room8/room8_2m.png",
    "img/rooms/room8/room8_3m.png",
    "img/rooms/room8/room8_4m.png",
    "img/rooms/room8/room8_3m.png",
    "img/rooms/room8/room8_2m.png"
  );

  middlegroundLayer.SetAnimationRate(30);
  room.SetMiddlegroundLayer(middlegroundLayer);

  room.SetAmbient("wind");

  addDoors(room);
  scene.AddBackground("Room8", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room7");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(281, 0, 350, 350);
    door2.SetDestination("Room9");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
  }
}
