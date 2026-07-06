// Scene manager: owns every room, tracks the current one, and dispatches
// input/rendering to it. Rooms are keyed by a numeric index (Begin = -1,
// Room0 = 0, Room1..Room34 = 1..34).
import { sound_engine } from "./audio";
import { obj_database, door_database } from "../objects/object-database";
import { setCursor, hideTitles } from "../ui";
import { buildRoom } from "./room-loader";
import type { Room } from "./room";
import type { RoomConfig, Registry } from "../data/schema";

class SceneMgr {
  private sceneMap = new Map<number, Room>();
  private sceneNameMap = new Map<string, number>();
  private currentScene = 0;
  private sceneIdx = 0;

  // Every room name is registered first so doors can resolve destinations by
  // name before any room is built from its config.
  Init(configs: RoomConfig[], registry: Registry): void {
    const totalRooms = 34;

    this.sceneNameMap.set("Room0", 0);
    this.sceneNameMap.set("Begin", -1);

    obj_database.Init(registry.objects);
    door_database.Init(registry.doors);

    for (let i = 1; i <= totalRooms; i++) {
      this.NewScene("Room" + i);
    }

    for (const cfg of configs) {
      buildRoom(cfg);
    }

    this.SetScene(-1);
  }

  AddBackground(title: string, room: Room): void {
    const idx = this.GetSceneIdx(title);
    this.sceneMap.set(idx, room);
    room.title = title;
  }

  Render(context: CanvasRenderingContext2D): void {
    this.current().Render(context);
  }

  GetSceneIdx(sceneName: string): number {
    return this.sceneNameMap.get(sceneName)!;
  }

  NewScene(sceneName: string): number {
    // scene_idx = 0 is reserved for Room0 (the title/intro screen).
    this.sceneIdx++;
    this.sceneNameMap.set(sceneName, this.sceneIdx);
    return this.sceneIdx;
  }

  MouseOver(x: number, y: number): boolean {
    return this.current().ProcessMouseOver(x, y);
  }

  MouseClick(x: number, y: number): void {
    this.current().ProcessMouseClick(x, y);
  }

  SetScene(newScene: number): void {
    this.currentScene = newScene;
    // Reset the cursor: otherwise it stays a pointer until the mouse moves.
    setCursor("default");

    const room = this.current();

    if (sound_engine.GetCurrentSound() !== room.GetAmbience()) {
      sound_engine.Stop("ambient");
      sound_engine.Set(room.GetAmbience());
      sound_engine.PlayLooped(room.GetAmbience());
    }

    hideTitles();
  }

  GetCurrentSceneTitle(): string {
    return this.current().title;
  }

  GetRoom(name: string): Room {
    return this.sceneMap.get(this.GetSceneIdx(name))!;
  }

  UpdateRoom(name: string, room: Room): void {
    this.sceneMap.set(this.GetSceneIdx(name), room);
  }

  private current(): Room {
    return this.sceneMap.get(this.currentScene)!;
  }
}

export const scene = new SceneMgr();
