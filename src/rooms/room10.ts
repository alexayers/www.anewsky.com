import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export function Room10(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room10/room10_1b.png",
    "img/rooms/room10/room10_2b.png",
    "img/rooms/room10/room10_3b.png"
  );
  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room10/room10_1m.png",
    "img/rooms/room10/room10_2m.png",
    "img/rooms/room10/room10_3m.png",
    "img/rooms/room10/room10_2m.png"
  );
  middlegroundLayer.SetAnimationRate(15);
  room.SetMiddlegroundLayer(middlegroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages(
    "img/rooms/room10/room10_1f.png",
    "img/rooms/room10/room10_2f.png",
    "img/rooms/room10/room10_3f.png",
    "img/rooms/room10/room10_4f.png",
    "img/rooms/room10/room10_4f.png"
  );
  foregroundLayer.SetAnimationRate(25);
  room.SetForegroundLayer(foregroundLayer);
  room.SetAmbient("wind");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room10", room);

  function addObjects(room: Room): void {
    const parachute = new GameObject("itembox");
    parachute.SetPosition(219, 66, 297, 281);
    parachute.SetClickSound("sail");
    parachute.SetImage("img/objects/parachute.png");

    parachute.SetTitle("parachute");
    parachute.SetClickCallBack(() => {
      const middlegroundLayer = new Layer();
      middlegroundLayer.LoadImages("img/rooms/room10/room10_no_chute_m.png");
      room.SetMiddlegroundLayer(middlegroundLayer);
    });

    obj_database.UpdateObject("parachute", parachute);
    room.AddObject(parachute);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room9");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);
  }
}
