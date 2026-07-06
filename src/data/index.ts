// Loads and validates every room config at startup. Room JSON files under
// ./rooms are auto-discovered, so adding a room needs no edit here.
import type { RoomConfig, Registry } from "./schema";
import { validateRoomConfig, validateReferences } from "./config-validator";
import registryJson from "./registry.json";

const rawRooms = import.meta.glob("./rooms/*.json", { eager: true, import: "default" }) as Record<
  string,
  unknown
>;

export const roomConfigs: RoomConfig[] = Object.entries(rawRooms).map(([path, raw]) =>
  validateRoomConfig(raw, path)
);

validateReferences(roomConfigs);

export const registry: Registry = registryJson as Registry;
