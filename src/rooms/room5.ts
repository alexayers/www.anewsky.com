import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { obj_database, door_database } from "../objects/object-database";

export function Room5(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room5/room5_1b.png",
    "img/rooms/room5/room5_2b.png",
    "img/rooms/room5/room5_3b.png"
  );

  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room5/room5_1m.png",
    "img/rooms/room5/room5_2m.png"
  );

  middlegroundLayer.SetAnimationRate(70);
  room.SetMiddlegroundLayer(middlegroundLayer);
  room.SetAmbient("wind");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room5", room);

  function addObjects(room: Room): void {
    const cardreader = new GameObject("hitbox");
    cardreader.SetClickSound("slide_door");
    cardreader.SetPosition(270, 183, 302, 230);
    cardreader.SetTitle("cardreader");

    cardreader.SetClickCallBack(() => {
      if (inventory.IsSelectedItem("keycard")) {
        console.log("Trying to unlock door.");
        door_database.UnlockDoor("mapdoor_room5");

        const newMiddleground = new Layer();
        newMiddleground.LoadImages(
          "img/rooms/room5/room5_1mb.png",
          "img/rooms/room5/room5_2mb.png"
        );
        newMiddleground.SetAnimationRate(70);
        room.SetMiddlegroundLayer(newMiddleground);
        inventory.RemoveCurrentItem();
      }
    });

    obj_database.UpdateObject("cardreader", cardreader);
    room.AddObject(cardreader);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(154, 131, 247, 267);
    door1.SetDestination("Room18");
    door1.SetClickSound("slide_door");
    door1.SetTitle("mapdoor_room5");
    door1.LockDoor();

    door_database.UpdateDoor("mapdoor_room5", door1);
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(306, 0, 350, 350);
    door2.SetDestination("Room4");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
  }
}
