import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room15(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room15/room15_1b.png",
    "img/rooms/room15/room15_2b.png",
    "img/rooms/room15/room15_3b.png",
    "img/rooms/room15/room15_4b.png"
  );

  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages("img/rooms/room15/room15_1f.png");
  room.SetForegroundLayer(foregroundLayer);

  room.SetAmbient("cave");

  addDoors(room);
  scene.AddBackground("Room15", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room24");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(315, 0, 350, 350);
    door2.SetDestination("Room16");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(84, 98, 267, 258);
    door3.SetDestination("Room13");
    door3.SetClickSound("walk_sand");
    room.AddDoor(door3);
  }
}
