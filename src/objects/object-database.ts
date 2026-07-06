// Registries mapping names to stable numeric ids (used for key/lock matching)
// and to live object/door instances (used for cross-room state changes).
import type { GameObject } from "./game-object";
import type { Door } from "./door";

class ObjDatabase {
  private objIdList: Record<string, number> = {};
  private objList: Record<string, GameObject> = {};
  private objIdx = 1;

  // Registers object ids in order; the index becomes the id used for key/lock
  // matching, so the ordering (from data/registry.json) must be preserved.
  Init(names: string[]): void {
    for (const name of names) {
      this.RegisterObject(name);
    }
  }

  RegisterObject(name: string): void {
    this.objIdList[name] = this.objIdx;
    this.objIdx++;
  }

  UpdateObject(name: string, object: GameObject): void {
    this.objList[name] = object;
  }

  GetObject(name: string): GameObject {
    return this.objList[name];
  }

  GetObjectId(name: string): number {
    return this.objIdList[name];
  }
}

class DoorDatabase {
  private doorList: Record<string, Door> = {};

  Init(names: string[]): void {
    for (const name of names) {
      this.RegisterDoor(name);
    }
  }

  RegisterDoor(name: string): void {
    // Placeholder until the owning room registers the live Door instance.
    delete this.doorList[name];
  }

  UpdateDoor(name: string, door: Door): void {
    this.doorList[name] = door;
  }

  LockDoor(name: string): void {
    this.doorList[name].LockDoor();
  }

  UnlockDoor(name: string): void {
    this.doorList[name].UnlockDoor();
  }

  GetDoor(name: string): Door {
    return this.doorList[name];
  }
}

export const obj_database = new ObjDatabase();
export const door_database = new DoorDatabase();
