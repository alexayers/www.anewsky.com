import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { scene } from "../engine/scenemgr";
import { door_database } from "../objects/object-database";

export function Room12(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room12/room12_1b.png",
    "img/rooms/room12/room12_2b.png",
    "img/rooms/room12/room12_3b.png",
    "img/rooms/room12/room12_4b.png"
  );

  backgroundLayer.SetAnimationRate(25);
  room.SetBackgroundLayer(backgroundLayer);

  room.SetAmbient("waves");

  addDoors(room);
  scene.AddBackground("Room12", room);

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room20");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(315, 0, 350, 350);
    door2.SetDestination("Room13");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);

    const door3 = new Door();
    door3.SetPosition(235, 154, 294, 195);
    door3.SetDestination("Room22");
    door3.SetClickSound("walk_sand");
    door3.SetTitle("energydoor_room12");
    room.AddDoor(door3);
    door_database.UpdateDoor("energydoor_room12", door3);

    const door4 = new Door();
    door4.SetPosition(105, 165, 211, 261);
    door4.SetDestination("Room23");
    door4.SetClickSound("walk_sand");

    room.AddDoor(door4);
  }
}
