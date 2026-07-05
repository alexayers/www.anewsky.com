import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room17(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room17/room17_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.SetAnimationRate(15);
  middlegroundLayer.LoadImages(
    "img/rooms/room17/room17_1m.png",
    "img/rooms/room17/room17_2m.png",
    "img/rooms/room17/room17_3m.png"
  );
  room.SetMiddlegroundLayer(middlegroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages("img/rooms/room17/room17_1f.png");
  room.SetForegroundLayer(foregroundLayer);

  room.SetAmbient("cave");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room17", room);

  function addObjects(room: Room): void {
    const glassdoor = new GameObject("hitbox");
    glassdoor.SetPosition(98, 78, 251, 175);
    glassdoor.SetClickCallBack(() => {
      const generator = obj_database.GetObject("generator");
      const power = generator.GetValue();

      if (power == "powered") {
        sound_engine.PlaySound("open_compartment");

        const foregroundLayer = new Layer();
        foregroundLayer.LoadImages("img/objects/nothing.png");
        room.SetForegroundLayer(foregroundLayer);

        const middlegroundLayer = new Layer();
        middlegroundLayer.LoadImages("img/objects/nothing.png");
        room.SetMiddlegroundLayer(middlegroundLayer);

        const pinkCrystal = new GameObject("itembox");
        pinkCrystal.SetTitle("pink_crystal");
        pinkCrystal.SetFriendlyTitle("pink crystal");
        pinkCrystal.SetImage("img/objects/pink_crystal.png");

        obj_database.UpdateObject("pink_crystal", pinkCrystal);
        inventory.AddItem(pinkCrystal);

        glassdoor.Destroy();
      } else {
        glassdoor.SetClickSound("touch_glass");
      }
    });

    room.AddObject(glassdoor);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room16");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);
  }
}
