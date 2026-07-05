import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { inventory } from "../engine/inventory";
import { obj_database } from "../objects/object-database";

export function Room29(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room29/room29_1b.png");

  room.SetBackgroundLayer(backgroundLayer);

  const middlegroundLayer = new Layer();
  middlegroundLayer.LoadImages("img/rooms/room29/room29_1m.png");

  room.SetMiddlegroundLayer(middlegroundLayer);

  room.SetAmbient("spaceship");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room29", room);

  function addObjects(room: Room): void {
    const trunk = new GameObject("hitbox");
    trunk.SetClickSound("remove_power");
    trunk.SetPosition(46, 140, 331, 314);
    trunk.SetTitle("trunk");
    trunk.SetClickCallBack(() => {
      const middlegroundLayer = new Layer();
      middlegroundLayer.LoadImages("img/objects/nothing.png");
      middlegroundLayer.SetAnimationRate(70);
      room.SetMiddlegroundLayer(middlegroundLayer);

      const powerCell = new GameObject("item");
      powerCell.SetTitle("power_cell");
      powerCell.SetFriendlyTitle("power cell");
      powerCell.SetImage("img/objects/power_cell.png");
      obj_database.UpdateObject("power_cell", powerCell);
      inventory.AddItem(powerCell);

      trunk.Destroy();
    });

    obj_database.UpdateObject("trunk", trunk);
    room.AddObject(trunk);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 337, 121);
    door1.SetDestination("Room12");
    door1.SetClickSound("walk_sand");
    room.AddDoor(door1);
  }
}
