import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { obj_database } from "../objects/object-database";

export function Room9(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages(
    "img/rooms/room9/room9_1b.png",
    "img/rooms/room9/room9_2b.png",
    "img/rooms/room9/room9_3b.png"
  );

  backgroundLayer.SetAnimationRate(50);
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages("img/rooms/room9/room9_1m.png");
  room.SetMiddlegroundLayer(middlegroundLayer);

  room.SetAmbient("wind");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room9", room);

  function addObjects(room: Room): void {
    const pilar2 = new GameObject("hitbox");
    pilar2.SetPosition(132, 131, 184, 177);
    pilar2.SetClickSound("rocks");
    pilar2.SetTitle("pilar2");
    pilar2.SetValue("");

    pilar2.SetClickCallBack(() => {
      if (inventory.IsSelectedItem("purple_crystal")) {
        pilar2.SetValue("true");
        const pilar3 = obj_database.GetObject("pilar3");

        if (pilar3.GetValue() === "true") {
          const newMiddleground = new Layer();
          newMiddleground.LoadImages(
            "img/rooms/room9/room9_1m_all.png",
            "img/rooms/room9/room9_2m_all.png",
            "img/rooms/room9/room9_3m_all.png"
          );

          newMiddleground.SetAnimationRate(30);
          room.SetMiddlegroundLayer(newMiddleground);

          const room30 = scene.GetRoom("Room30");
          const newBackground = new Layer();
          newBackground.LoadImages(
            "img/rooms/room30/room30_1bb.png",
            "img/rooms/room30/room30_1bc.png"
          );

          newBackground.SetAnimationRate(30);

          room30.SetBackgroundLayer(newBackground);
          scene.UpdateRoom("Room30", room30);
        } else {
          const newMiddleground = new Layer();
          newMiddleground.LoadImages("img/rooms/room9/room9_1m_purple.png");
          room.SetMiddlegroundLayer(newMiddleground);
        }

        obj_database.UpdateObject("pilar2", pilar2);
        inventory.RemoveCurrentItem();
      }
    });

    obj_database.UpdateObject("pilar2", pilar2);
    room.AddObject(pilar2);

    const pilar3 = new GameObject("hitbox");
    pilar3.SetPosition(197, 65, 247, 140);

    pilar3.SetClickSound("rocks");
    pilar3.SetTitle("pilar3");
    pilar3.SetValue("");

    pilar3.SetClickCallBack(() => {
      if (inventory.IsSelectedItem("pink_crystal")) {
        pilar3.SetValue("true");
        const pilar2 = obj_database.GetObject("pilar2");

        if (pilar2.GetValue() === "true") {
          const newMiddleground = new Layer();
          newMiddleground.LoadImages(
            "img/rooms/room9/room9_1m_all.png",
            "img/rooms/room9/room9_2m_all.png",
            "img/rooms/room9/room9_3m_all.png"
          );

          newMiddleground.SetAnimationRate(30);

          room.SetMiddlegroundLayer(newMiddleground);

          const room30 = scene.GetRoom("Room30");
          const newBackground = new Layer();
          newBackground.LoadImages(
            "img/rooms/room30/room30_1bb.png",
            "img/rooms/room30/room30_1bc.png"
          );

          newBackground.SetAnimationRate(30);

          room30.SetBackgroundLayer(newBackground);
          scene.UpdateRoom("Room30", room30);
        } else {
          const newMiddleground = new Layer();
          newMiddleground.LoadImages("img/rooms/room9/room9_1m_pink.png");
          room.SetMiddlegroundLayer(newMiddleground);
        }

        obj_database.UpdateObject("pilar3", pilar3);
        inventory.RemoveCurrentItem();
      }
    });

    obj_database.UpdateObject("pilar3", pilar3);
    room.AddObject(pilar3);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room8");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(281, 0, 350, 350);
    door2.SetDestination("Room10");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
  }
}
