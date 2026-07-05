import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room7(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room7/room7_1b.png",
    "img/rooms/room7/room7_2b.png",
    "img/rooms/room7/room7_3b.png"
  );

  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages("img/rooms/room7/room7_1m.png");
  middlegroundLayer.SetAnimationRate(30);

  room.SetMiddlegroundLayer(middlegroundLayer);
  room.SetAmbient("wind");

  addDoors(room);

  scene.AddBackground("Room7", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room6");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(281, 0, 350, 350);
    door2.SetDestination("Room8");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(132, 187, 201, 243);
    door3.SetDestination("Room20");
    door3.SetClickSound("walk_ladder");
    room.AddDoor(door3);
  }
}
