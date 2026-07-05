import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room14(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room14/room14_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages("img/rooms/room14/room14_1m.png");

  room.SetMiddlegroundLayer(middlegroundLayer);
  room.SetAmbient("waves");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room14", room);

  function addObjects(room: Room): void {
    const grave = new GameObject("hitbox");
    grave.SetPosition(149, 234, 206, 312);

    grave.SetClickCallBack(() => {
      if (inventory.IsSelectedItem("shovel")) {
        sound_engine.PlaySound("dig");

        const middlegroundLayer = new Layer();
        middlegroundLayer.LoadImages("img/rooms/room14/room14_1mb.png");
        room.SetMiddlegroundLayer(middlegroundLayer);
        inventory.RemoveCurrentItem();

        const purpleCrystal = new GameObject("itembox");
        purpleCrystal.SetTitle("purple_crystal");
        purpleCrystal.SetFriendlyTitle("purple crystal");
        purpleCrystal.SetImage("img/objects/purple_crystal.png");

        obj_database.UpdateObject("purple_crystal", purpleCrystal);
        inventory.AddItem(purpleCrystal);

        grave.Destroy();
      }
    });

    obj_database.UpdateObject("grave", grave);
    room.AddObject(grave);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room13");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);
  }
}
