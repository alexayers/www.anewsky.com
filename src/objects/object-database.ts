// Registries mapping names to stable numeric ids (used for key/lock matching)
// and to live object/door instances (used for cross-room state changes).
import type { GameObject } from "./game-object";
import type { Door } from "./door";

class ObjDatabase {
  private objIdList: Record<string, number> = {};
  private objList: Record<string, GameObject> = {};
  private objIdx = 1;

  Init(): void {
    this.RegisterObject("keycard");
    this.RegisterObject("key");
    this.RegisterObject("hammer");
    this.RegisterObject("toolbox");
    this.RegisterObject("purple_crystal");
    this.RegisterObject("pink_crystal");
    this.RegisterObject("blue_crystal");
    this.RegisterObject("storage_device");
    this.RegisterObject("parachute");
    this.RegisterObject("photo");
    this.RegisterObject("cardreader");
    this.RegisterObject("broken_cardreader");
    this.RegisterObject("keypad");
    this.RegisterObject("keypad_enter");
    this.RegisterObject("power_cell");
    this.RegisterObject("trunk");
    this.RegisterObject("generator");
    this.RegisterObject("mappad");
    this.RegisterObject("mappad_enter");
    this.RegisterObject("glassdoor");
    this.RegisterObject("shovel");
    this.RegisterObject("wall_shovel");
    this.RegisterObject("grave");
    this.RegisterObject("release_storage");
    this.RegisterObject("empty_storage");
    this.RegisterObject("cave_computer");
    this.RegisterObject("mapload_enter");
    this.RegisterObject("nav_storage");
    this.RegisterObject("nav_enter");
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

  Init(): void {
    this.RegisterDoor("mapdoor_room5");
    this.RegisterDoor("jaildoor_room1");
    this.RegisterDoor("energydoor_room22");
    this.RegisterDoor("energydoor_room12");
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
