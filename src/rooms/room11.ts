import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { scene } from "../engine/scenemgr";

export function Room11(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room11.png");
  room.SetBackgroundLayer(backgroundLayer);

  scene.AddBackground("Room11", room);
}
