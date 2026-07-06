// Declarative room configuration. Room content (layers, objects, doors) lives in
// JSON under src/data/rooms/; interactive behavior stays in TypeScript and is
// referenced from JSON by a handler id (see src/handlers/).

export type ObjectType = "item" | "hitbox" | "itembox";
export type LayerRole = "background" | "middleground" | "foreground";
export type Rect = [number, number, number, number]; // topX, topY, bottomX, bottomY

export interface LayerConfig {
  role: LayerRole;
  images: string[];
  animationRate?: number; // omitted = static (no animation)
  autoPlay?: boolean; // default true; Room0's background is false
  loop?: boolean; // default true; Room34's background is false
}

export interface ObjectConfig {
  title: string; // GameObject.SetTitle
  /**
   * Key used for obj_database.UpdateObject; defaults to `title`. They differ in
   * Room26, where the enter button has title "keypad" but registers as
   * "keypad_enter".
   */
  registerAs?: string;
  type: ObjectType;
  position: Rect;
  image?: string;
  inactiveImage?: string;
  inventoryImage?: string;
  examineImage?: string;
  friendlyTitle?: string;
  clickSound?: string;
  value?: string; // initial GameObject value
  register?: boolean; // obj_database.UpdateObject (default true)
  onClick?: string; // click handler id, e.g. "room1.brokenCardreader"
  onRender?: string; // render handler id, e.g. "room26.keypad"
  config?: Record<string, unknown>; // puzzle params passed to the handler
}

export interface DoorConfig {
  position: Rect;
  destination: string; // room id, e.g. "Room4"
  clickSound?: string;
  title?: string;
  locked?: boolean;
  key?: string; // Door.SetKey(item name)
  register?: boolean; // door_database.UpdateDoor
}

export interface RoomConfig {
  id: string; // "Begin" | "Room0" … "Room34"
  ambient?: string;
  layers: LayerConfig[];
  objects?: ObjectConfig[];
  doors?: DoorConfig[];
  oneTime?: string; // one-time handler id (Room0 intro cutscene)
}

export interface Registry {
  objects: string[]; // ordered — assigns the ids used for key/lock matching
  doors: string[];
}
