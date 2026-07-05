import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Room34(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room34/ending_0.png",
    "img/rooms/room34/ending_1.png",
    "img/rooms/room34/ending_2.png"
  );

  backgroundLayer.SetAnimationRate(150);
  backgroundLayer.DoNotLoop();
  room.SetBackgroundLayer(backgroundLayer);

  room.SetAmbient("waves");

  addDoors(room);

  scene.AddBackground("Room34", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(77, 142, 161, 269);
    door1.SetDestination("Room21");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);
  }
}
