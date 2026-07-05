import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export function Room27(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room27/room27_1b.png");

  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("bad_light");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room27", room);

  function addObjects(room: Room): void {
    const photo = new GameObject("itembox");
    photo.SetPosition(66, 180, 140, 215);
    photo.SetClickSound("pickup");
    photo.SetImage("img/objects/photo.png");
    photo.SetTitle("photo");

    photo.SetClickCallBack(() => {
      const newBackground = new Layer();
      newBackground.LoadImages("img/rooms/room27/room27_1bb.png");
      room.SetMiddlegroundLayer(newBackground);
    });

    obj_database.UpdateObject("photo", photo);
    room.AddObject(photo);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 350, 145);
    door1.SetDestination("Room2");
    door1.SetClickSound("walk_building");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(0, 237, 350, 350);
    door2.SetDestination("Room2");
    door2.SetClickSound("walk_building");
    room.AddDoor(door2);
  }
}
