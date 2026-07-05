import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { sound_engine } from "../engine/audio";
import { obj_database } from "../objects/object-database";

export function Room16(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room16/room16_1b.png");
  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages(
    "img/rooms/room16/room16_1m.png",
    "img/rooms/room16/room16_2m.png",
    "img/rooms/room16/room16_3m.png",
    "img/rooms/room16/room16_4m.png",
    "img/rooms/room16/room16_5m.png",
    "img/rooms/room16/room16_6m.png",
    "img/rooms/room16/room16_6m.png",
    "img/rooms/room16/room16_6m.png",
    "img/rooms/room16/room16_6m.png"
  );

  middlegroundLayer.SetAnimationRate(10);

  room.SetMiddlegroundLayer(middlegroundLayer);

  const foregroundLayer = new Layer();
  foregroundLayer.LoadImages("img/rooms/room16/room16_1f.png");
  room.SetForegroundLayer(foregroundLayer);

  room.SetAmbient("cave");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room16", room);

  function addObjects(room: Room): void {
    const generator = new GameObject("hitbox");
    generator.SetPosition(141, 164, 204, 206);
    generator.SetClickSound("empty_supply");
    generator.SetTitle("generator");
    generator.SetValue("not_powered");
    generator.SetClickCallBack(() => {
      if (inventory.IsSelectedItem("power_cell")) {
        sound_engine.PlaySound("remove_power");
        const generator = obj_database.GetObject("generator");
        generator.SetValue("powered");
        obj_database.UpdateObject("generator", generator);

        inventory.RemoveCurrentItem();

        const foregroundLayer = new Layer();
        foregroundLayer.LoadImages("img/rooms/room16/room16_1fb.png");
        room.SetForegroundLayer(foregroundLayer);

        const room24 = scene.GetRoom("Room24");
        const backgroundLayer = new Layer();
        backgroundLayer.LoadImages("img/rooms/room24/room24_1bb.png");
        room24.SetBackgroundLayer(backgroundLayer);
        scene.UpdateRoom("Room24", room24);

        const room17 = scene.GetRoom("Room17");
        const room17ForegroundLayer = new Layer();
        room17ForegroundLayer.LoadImages("img/objects/nothing.png");
        room17.SetForegroundLayer(room17ForegroundLayer);
        scene.UpdateRoom("Room17", room17);
      }
    });

    room.AddObject(generator);
    obj_database.UpdateObject("generator", generator);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 63, 350);
    door1.SetDestination("Room15");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);

    const door2 = new Door();
    door2.SetPosition(315, 0, 350, 350);
    door2.SetDestination("Room17");
    door2.SetClickSound("walk_sand");
    room.AddDoor(door2);
  }
}
