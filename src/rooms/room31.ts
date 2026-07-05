import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room31(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room31/room31_1b.png");
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("bad_light");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room31", room);

  function addObjects(room: Room): void {
    const toolbox = new GameObject("hitbox");
    toolbox.SetPosition(128, 164, 294, 230);
    toolbox.SetTitle("cardreader");

    toolbox.SetClickCallBack(() => {
      sound_engine.PlaySound("pickup");

      const backgroundLayer = new Layer();
      backgroundLayer.LoadImages("img/rooms/room31/room31_1bb.png");
      room.SetBackgroundLayer(backgroundLayer);

      const hammer = new GameObject("itembox");
      hammer.SetImage("img/objects/hammer.png");
      hammer.SetTitle("hammer");
      obj_database.UpdateObject("hammer", hammer);
      inventory.AddItem(hammer);

      toolbox.Destroy();
    });

    obj_database.UpdateObject("toolbox", toolbox);
    room.AddObject(toolbox);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 350, 130);
    door1.SetDestination("Room3");
    door1.SetClickSound("open_toolbox");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(0, 239, 350, 350);
    door2.SetDestination("Room3");
    door2.SetClickSound("open_toolbox");
    room.AddDoor(door2);
  }
}
