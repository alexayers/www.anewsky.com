// Ordered registry of every room builder. SceneMgr.Init() calls each one after
// registering the scene names, so doors can resolve destinations by name.
import type { RoomBuilder } from "../engine/scenemgr";
import { Begin } from "./begin";
import { Room0 } from "./room0";
import { Room1 } from "./room1";
import { Room2 } from "./room2";
import { Room3 } from "./room3";
import { Room4 } from "./room4";
import { Room5 } from "./room5";
import { Room6 } from "./room6";
import { Room7 } from "./room7";
import { Room8 } from "./room8";
import { Room9 } from "./room9";
import { Room10 } from "./room10";
import { Room11 } from "./room11";
import { Room12 } from "./room12";
import { Room13 } from "./room13";
import { Room14 } from "./room14";
import { Room15 } from "./room15";
import { Room16 } from "./room16";
import { Room17 } from "./room17";
import { Room18 } from "./room18";
import { Room19 } from "./room19";
import { Room20 } from "./room20";
import { Room21 } from "./room21";
import { Room22 } from "./room22";
import { Room23 } from "./room23";
import { Room24 } from "./room24";
import { Room25 } from "./room25";
import { Room26 } from "./room26";
import { Room27 } from "./room27";
import { Room28 } from "./room28";
import { Room29 } from "./room29";
import { Room30 } from "./room30";
import { Room31 } from "./room31";
import { Room32 } from "./room32";
import { Room33 } from "./room33";
import { Room34 } from "./room34";

export const rooms: RoomBuilder[] = [
  Begin,
  Room0,
  Room1,
  Room2,
  Room3,
  Room4,
  Room5,
  Room6,
  Room7,
  Room8,
  Room9,
  Room10,
  Room11,
  Room12,
  Room13,
  Room14,
  Room15,
  Room16,
  Room17,
  Room18,
  Room19,
  Room20,
  Room21,
  Room22,
  Room23,
  Room24,
  Room25,
  Room26,
  Room27,
  Room28,
  Room29,
  Room30,
  Room31,
  Room32,
  Room33,
  Room34,
];
