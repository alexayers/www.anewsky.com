import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";

export function Begin(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/begin/begin1.png",
    "img/rooms/begin/begin2.png",
    "img/rooms/begin/begin3.png"
  );
  backgroundLayer.SetAnimationRate(20);
  room.SetBackgroundLayer(backgroundLayer);

  room.SetAmbient("begin");
  addDoors(room);

  scene.AddBackground("Begin", room);

  function addDoors(room: Room): void {
    const door = new Door();
    door.SetPosition(0, 0, 350, 350);
    door.SetDestination("Room0");
    room.AddDoor(door);
  }
}
