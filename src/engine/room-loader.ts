// Builds a live Room from a declarative RoomConfig, wiring interactive behavior
// to the named handlers. Reproduces exactly what the old imperative room builder
// functions did.
import { Room } from "./room";
import { Layer } from "../rendering/layer";
import { GameObject } from "../objects/game-object";
import { Door } from "../objects/door";
import { scene } from "./scenemgr";
import { obj_database, door_database } from "../objects/object-database";
import { clickHandlers, renderHandlers, oneTimeHandlers } from "../handlers";
import type { RoomConfig, LayerConfig, ObjectConfig, DoorConfig } from "../data/schema";

function buildLayer(cfg: LayerConfig): Layer {
  const layer = new Layer();
  layer.LoadImages(...cfg.images);
  if (cfg.animationRate !== undefined) {
    layer.SetAnimationRate(cfg.animationRate);
  }
  if (cfg.autoPlay === false) {
    layer.DoNotAutoPlay();
  }
  if (cfg.loop === false) {
    layer.DoNotLoop();
  }
  return layer;
}

function applyLayer(room: Room, cfg: LayerConfig): void {
  const layer = buildLayer(cfg);
  if (cfg.role === "background") {
    room.SetBackgroundLayer(layer);
  } else if (cfg.role === "middleground") {
    room.SetMiddlegroundLayer(layer);
  } else {
    room.SetForegroundLayer(layer);
  }
}

function buildObject(room: Room, cfg: ObjectConfig): void {
  const obj = new GameObject(cfg.type);
  obj.SetPosition(cfg.position[0], cfg.position[1], cfg.position[2], cfg.position[3]);

  if (cfg.image !== undefined) obj.SetImage(cfg.image);
  if (cfg.inactiveImage !== undefined) obj.SetInactiveImage(cfg.inactiveImage);
  if (cfg.inventoryImage !== undefined) obj.SetInventoryImage(cfg.inventoryImage);
  if (cfg.examineImage !== undefined) obj.SetExamineImage(cfg.examineImage);

  obj.SetTitle(cfg.title);
  if (cfg.friendlyTitle !== undefined) obj.SetFriendlyTitle(cfg.friendlyTitle);
  if (cfg.clickSound !== undefined) obj.SetClickSound(cfg.clickSound);
  if (cfg.value !== undefined) obj.SetValue(cfg.value);

  const handlerConfig = cfg.config ?? {};

  if (cfg.onClick !== undefined) {
    const handler = clickHandlers[cfg.onClick];
    obj.SetClickCallBack((x, y) => handler({ room, self: obj, x, y, config: handlerConfig }));
  }
  if (cfg.onRender !== undefined) {
    const handler = renderHandlers[cfg.onRender];
    obj.SetRenderCallBack(() => handler({ room, self: obj, config: handlerConfig }));
  }

  if (cfg.register !== false) {
    obj_database.UpdateObject(cfg.registerAs ?? cfg.title, obj);
  }
  room.AddObject(obj);
}

function buildDoor(room: Room, cfg: DoorConfig): void {
  const door = new Door();
  door.SetPosition(cfg.position[0], cfg.position[1], cfg.position[2], cfg.position[3]);
  door.SetDestination(cfg.destination);
  if (cfg.clickSound !== undefined) door.SetClickSound(cfg.clickSound);
  if (cfg.title !== undefined) door.SetTitle(cfg.title);
  if (cfg.locked === true) door.LockDoor();
  if (cfg.key !== undefined) door.SetKey(cfg.key);
  if (cfg.register === true && cfg.title !== undefined) {
    door_database.UpdateDoor(cfg.title, door);
  }
  room.AddDoor(door);
}

export function buildRoom(cfg: RoomConfig): void {
  const room = new Room();

  for (const layer of cfg.layers) {
    applyLayer(room, layer);
  }
  if (cfg.ambient !== undefined) {
    room.SetAmbient(cfg.ambient);
  }
  if (cfg.objects) {
    for (const object of cfg.objects) buildObject(room, object);
  }
  if (cfg.doors) {
    for (const door of cfg.doors) buildDoor(room, door);
  }
  if (cfg.oneTime !== undefined) {
    const handler = oneTimeHandlers[cfg.oneTime];
    room.SetOneTimeCallBack(() => handler({ room }));
  }

  scene.AddBackground(cfg.id, room);
}
