// Runtime validation for room configs: fails fast with a descriptive error if a
// JSON file is malformed or references a missing handler/room. This backstops
// the JSON Schema (which only helps in the editor).
import type { RoomConfig, ObjectConfig, DoorConfig, LayerConfig, Rect } from "./schema";
import { clickHandlers, renderHandlers, oneTimeHandlers } from "../handlers";

const OBJECT_TYPES = new Set(["item", "hitbox", "itembox"]);
const LAYER_ROLES = new Set(["background", "middleground", "foreground"]);

function fail(source: string, message: string): never {
  throw new Error(`Invalid room config (${source}): ${message}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isRect(value: unknown): value is Rect {
  return Array.isArray(value) && value.length === 4 && value.every((n) => typeof n === "number");
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((s) => typeof s === "string");
}

function validateLayer(source: string, raw: unknown): LayerConfig {
  if (!isRecord(raw)) fail(source, "layer is not an object");
  if (typeof raw.role !== "string" || !LAYER_ROLES.has(raw.role)) {
    fail(source, `layer.role must be one of ${[...LAYER_ROLES].join(", ")}`);
  }
  if (!isStringArray(raw.images) || raw.images.length === 0) {
    fail(source, "layer.images must be a non-empty string[]");
  }
  return raw as unknown as LayerConfig;
}

function validateObject(source: string, raw: unknown): ObjectConfig {
  if (!isRecord(raw)) fail(source, "object is not an object");
  if (typeof raw.title !== "string") fail(source, "object.title must be a string");
  if (typeof raw.type !== "string" || !OBJECT_TYPES.has(raw.type)) {
    fail(source, `object.type must be one of ${[...OBJECT_TYPES].join(", ")}`);
  }
  if (!isRect(raw.position)) fail(source, `object '${String(raw.title)}' needs a 4-number position`);
  return raw as unknown as ObjectConfig;
}

function validateDoor(source: string, raw: unknown): DoorConfig {
  if (!isRecord(raw)) fail(source, "door is not an object");
  if (!isRect(raw.position)) fail(source, "door needs a 4-number position");
  if (typeof raw.destination !== "string") fail(source, "door.destination must be a string");
  return raw as unknown as DoorConfig;
}

/** Validates a single room's shape (structure, enums, required fields). */
export function validateRoomConfig(raw: unknown, source: string): RoomConfig {
  if (!isRecord(raw)) fail(source, "not an object");
  if (typeof raw.id !== "string") fail(source, "missing string 'id'");
  if (!Array.isArray(raw.layers) || raw.layers.length === 0) {
    fail(source, "'layers' must be a non-empty array");
  }

  raw.layers.forEach((l) => validateLayer(source, l));
  if (raw.objects !== undefined) {
    if (!Array.isArray(raw.objects)) fail(source, "'objects' must be an array");
    raw.objects.forEach((o) => validateObject(source, o));
  }
  if (raw.doors !== undefined) {
    if (!Array.isArray(raw.doors)) fail(source, "'doors' must be an array");
    raw.doors.forEach((d) => validateDoor(source, d));
  }
  if (raw.oneTime !== undefined && typeof raw.oneTime !== "string") {
    fail(source, "'oneTime' must be a string");
  }

  return raw as unknown as RoomConfig;
}

/** Cross-config checks: door destinations and handler ids must resolve. */
export function validateReferences(configs: RoomConfig[]): void {
  const ids = new Set(configs.map((c) => c.id));

  for (const c of configs) {
    for (const door of c.doors ?? []) {
      if (!ids.has(door.destination)) {
        fail(c.id, `door destination '${door.destination}' is not a known room`);
      }
    }
    for (const obj of c.objects ?? []) {
      if (obj.onClick !== undefined && !(obj.onClick in clickHandlers)) {
        fail(c.id, `onClick handler '${obj.onClick}' is not registered`);
      }
      if (obj.onRender !== undefined && !(obj.onRender in renderHandlers)) {
        fail(c.id, `onRender handler '${obj.onRender}' is not registered`);
      }
    }
    if (c.oneTime !== undefined && !(c.oneTime in oneTimeHandlers)) {
      fail(c.id, `oneTime handler '${c.oneTime}' is not registered`);
    }
  }
}
