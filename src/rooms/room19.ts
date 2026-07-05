import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room19(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room19/room19_1b.png",
    "img/rooms/room19/room19_2b.png",
    "img/rooms/room19/room19_3b.png"
  );

  backgroundLayer.SetAnimationRate(30);
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("maproom");

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room19/room19_1m.png",
    "img/rooms/room19/room19_2m.png",
    "img/rooms/room19/room19_3m.png",
    "img/rooms/room19/room19_4m.png",
    "img/rooms/room19/room19_5m.png",
    "img/rooms/room19/room19_6m.png"
  );

  middlegroundLayer.SetAnimationRate(30);
  room.SetMiddlegroundLayer(middlegroundLayer);

  addDoors(room);

  scene.AddBackground("Room19", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 46, 350);
    door1.SetDestination("Room18");
    door1.SetClickSound("ogg/walk_building");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(109, 154, 163, 207);
    door2.SetDestination("Room25");
    door2.SetClickSound("walk_computer");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetClickSound("walk_computer");
    door3.SetDestination("Room30");
    door3.SetPosition(185, 221, 254, 257);
    room.AddDoor(door3);
  }
}
