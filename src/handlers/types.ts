// Context passed to behavior handlers, replacing the closures the old room
// builder functions relied on. `room` is the room being interacted with and
// `self` is the object the handler is attached to; engine singletons (scene,
// inventory, sound_engine, obj_database, door_database) are imported directly
// inside the handlers, exactly as the original callbacks did.
import type { Room } from "../engine/room";
import type { GameObject } from "../objects/game-object";

export interface ClickContext {
  room: Room;
  self: GameObject;
  x: number;
  y: number;
  config: Record<string, unknown>;
}

export interface RenderContext {
  room: Room;
  self: GameObject;
  config: Record<string, unknown>;
}

export interface OneTimeContext {
  room: Room;
}

export type ClickHandler = (ctx: ClickContext) => void;
export type RenderHandler = (ctx: RenderContext) => void;
export type OneTimeHandler = (ctx: OneTimeContext) => void;
