import type { ClickHandler } from "./types";
import { sound_engine } from "../engine/audio";
import { scene } from "../engine/scenemgr";
import { obj_database } from "../objects/object-database";

export const clickHandlers: Record<string, ClickHandler> = {
  "room24.caveComputer": () => {
    const generator = obj_database.GetObject("generator");
    const power = generator.GetValue();

    if (power === "powered") {
      sound_engine.PlaySound("walk_computer");
      scene.SetScene(32);
    }
  },
};
