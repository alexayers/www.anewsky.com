import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database, door_database } from "../objects/object-database";

export function Room1(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room1/room1_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages(
    "img/rooms/room1/room1_1f.png",
    "img/rooms/room1/room1_2f.png",
    "img/rooms/room1/room1_3f.png",
    "img/rooms/room1/room1_2f.png"
  );
  foregroundLayer.SetAnimationRate(20);
  room.SetForegroundLayer(foregroundLayer);
  room.SetAmbient("bad_light");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room1", room);

  function addObjects(room: Room): void {
    const key = new GameObject("item");
    key.SetPosition(116, 280, 116 + 32, 280 + 32);
    key.SetClickSound("pickup_keys");
    key.SetImage("img/objects/key.png");
    key.SetTitle("key");

    obj_database.UpdateObject("key", key);
    room.AddObject(key);

    const brokenCardreader = new GameObject("hitbox");
    brokenCardreader.SetPosition(167, 200, 185, 223);
    brokenCardreader.SetTitle("broken_cardreader");

    brokenCardreader.SetClickCallBack(() => {
      if (inventory.IsSelectedItem("hammer")) {
        sound_engine.PlaySound("break_door");

        brokenCardreader.SetValue("broken");
        door_database.UnlockDoor("jaildoor_room1");
        inventory.RemoveCurrentItem();

        const newBackground = new Layer();
        newBackground.LoadImages("img/rooms/room1/room1_1bb.png");
        room.SetBackgroundLayer(newBackground);
        obj_database.UpdateObject("broken_cardreader", brokenCardreader);
      } else if (brokenCardreader.GetValue() === "broken") {
        sound_engine.PlaySound("broken_cardreader");
      } else {
        brokenCardreader.SetClickSound("bad_code");
      }
    });

    room.AddObject(brokenCardreader);
    obj_database.UpdateObject("broken_cardreader", brokenCardreader);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(77, 142, 161, 269);
    door1.SetDestination("Room4");
    door1.SetClickSound("slide_door");
    door1.SetTitle("jaildoor_room1");
    door1.LockDoor();
    room.AddDoor(door1);
    door_database.UpdateDoor("jaildoor_room1", door1);

    const door2 = new Door();
    door2.SetPosition(0, 0, 42, 348);
    door2.SetDestination("Room2");
    door2.SetClickSound("walk_building");
    room.AddDoor(door2);
  }
}
