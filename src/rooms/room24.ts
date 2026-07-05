import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room24(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room24/room24_1b.png");
  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("cave");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room24", room);

  function addObjects(room: Room): void {
    const caveComputer = new GameObject("hitbox");
    caveComputer.SetPosition(134, 89, 234, 168);
    caveComputer.SetTitle("cave_computer");
    caveComputer.SetClickCallBack(() => {
      const generator = obj_database.GetObject("generator");
      const power = generator.GetValue();

      if (power === "powered") {
        sound_engine.PlaySound("walk_computer");
        scene.SetScene(32);
      }
    });

    room.AddObject(caveComputer);
    obj_database.UpdateObject("cave_computer", caveComputer);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(315, 0, 350, 350);
    door1.SetDestination("Room15");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);
  }
}
