import { Room } from "../engine/room";
import { Layer } from "../rendering/layer";
import { Door } from "../objects/door";
import { GameObject } from "../objects/game-object";
import { scene } from "../engine/scenemgr";
import { sound_engine } from "../engine/audio";
import { obj_database, door_database } from "../objects/object-database";

export function Room26(): void {
  const room = new Room();

  const backgroundLayer = new Layer();
  backgroundLayer.LoadImages("img/rooms/room26/room26_1b.png");

  room.SetBackgroundLayer(backgroundLayer);
  room.SetAmbient("spaceship");

  addObjects(room);
  addDoors(room);

  scene.AddBackground("Room26", room);

  function addObjects(room: Room): void {
    const keypadEnter = new GameObject("hitbox");
    keypadEnter.SetClickSound("walk_computer");
    keypadEnter.SetPosition(222, 120, 329, 164);
    keypadEnter.SetTitle("keypad");

    keypadEnter.SetClickCallBack(() => {
      const keypad = obj_database.GetObject("keypad");
      const value = keypad.GetValue();

      if (value === "7,3,2,9,6,") {
        const newBackground = new Layer();
        newBackground.LoadImages("img/rooms/room26/room26_1bb.png");
        room.SetBackgroundLayer(newBackground);

        sound_engine.PlaySound("good_code");
        sound_engine.PlaySound("open_compartment");

        door_database.UnlockDoor("energydoor_room22");

        const room12 = scene.GetRoom("Room12");

        const room12Background = new Layer();
        room12Background.LoadImages(
          "img/rooms/room12/room12_1bb.png",
          "img/rooms/room12/room12_2bb.png",
          "img/rooms/room12/room12_3bb.png",
          "img/rooms/room12/room12_4bb.png"
        );

        room12Background.SetAnimationRate(25);
        room12.SetBackgroundLayer(room12Background);

        const door12 = door_database.GetDoor("energydoor_room12");
        door12.SetDestination("Room29");
        door_database.UpdateDoor("energydoor_room12", door12);
        room12.AddDoor(door12);
        scene.UpdateRoom("Room12", room12);
      } else {
        keypad.SetValue("");
        obj_database.UpdateObject("keypad", keypad);
        sound_engine.PlaySound("bad_code");
      }
    });

    obj_database.UpdateObject("keypad_enter", keypadEnter);
    room.AddObject(keypadEnter);

    const keypad = new GameObject("hitbox");
    keypad.SetClickSound("computer_type");
    keypad.SetPosition(22, 200, 330, 341);
    keypad.SetTitle("keypad");

    keypad.SetClickCallBack((x, y) => {
      const keypad = obj_database.GetObject("keypad");

      let value = keypad.GetValue();

      if (value.length === 10) {
        console.log("Keypad full.");
        return;
      }

      if (x >= 23 && x <= 65 && y >= 197 && y <= 261) {
        value += "1,";
      } else if (x >= 77 && x <= 130 && y >= 197 && y <= 261) {
        value += "2,";
      } else if (x >= 141 && x <= 196 && y >= 197 && y <= 261) {
        value += "3,";
      } else if (x >= 208 && x <= 262 && y >= 197 && y <= 261) {
        value += "4,";
      } else if (x >= 273 && x <= 326 && y >= 197 && y <= 261) {
        value += "5,";
      } else if (x >= 23 && x <= 65 && y >= 273 && y <= 337) {
        value += "6,";
      } else if (x >= 77 && x <= 130 && y >= 273 && y <= 337) {
        value += "7,";
      } else if (x >= 141 && x <= 196 && y >= 273 && y <= 337) {
        value += "8,";
      } else if (x >= 208 && x <= 262 && y >= 273 && y <= 337) {
        value += "9,";
      } else if (x >= 273 && x <= 326 && y >= 273 && y <= 337) {
        value += "a,";
      }

      console.log(value);
      keypad.SetValue(value);
    });

    keypad.SetRenderCallBack(() => {
      const canvas = document.getElementById("Viewport") as HTMLCanvasElement | null;
      if (canvas === null) {
        return;
      }
      const context = canvas.getContext("2d");
      if (context === null) {
        return;
      }
      const keypad = obj_database.GetObject("keypad");
      const value = keypad.GetValue();

      const button_1 = new Image();
      const button_2 = new Image();
      const button_3 = new Image();
      const button_4 = new Image();
      const button_5 = new Image();
      const button_6 = new Image();
      const button_7 = new Image();
      const button_8 = new Image();
      const button_9 = new Image();
      const button_10 = new Image();

      button_1.src = "img/objects/1.png";
      button_2.src = "img/objects/2.png";
      button_3.src = "img/objects/3.png";
      button_4.src = "img/objects/4.png";
      button_5.src = "img/objects/5.png";
      button_6.src = "img/objects/6.png";
      button_7.src = "img/objects/7.png";
      button_8.src = "img/objects/8.png";
      button_9.src = "img/objects/9.png";
      button_10.src = "img/objects/10.png";

      if (value !== "") {
        const digits = value.split(",");
        const total = digits.length;
        let offset = 5;

        for (let i = 0; i < total; i++) {
          if (digits[i] === "1") {
            context.drawImage(button_1, offset, 35, 63, 84);
          } else if (digits[i] === "2") {
            context.drawImage(button_2, offset, 35, 63, 84);
          } else if (digits[i] === "3") {
            context.drawImage(button_3, offset, 35, 63, 84);
          } else if (digits[i] === "4") {
            context.drawImage(button_4, offset, 35, 63, 84);
          } else if (digits[i] === "5") {
            context.drawImage(button_5, offset, 35, 63, 84);
          } else if (digits[i] === "6") {
            context.drawImage(button_6, offset, 35, 63, 84);
          } else if (digits[i] === "7") {
            context.drawImage(button_7, offset, 35, 63, 84);
          } else if (digits[i] === "8") {
            context.drawImage(button_8, offset, 35, 63, 84);
          } else if (digits[i] === "9") {
            context.drawImage(button_9, offset, 35, 63, 84);
          } else if (digits[i] === "a") {
            context.drawImage(button_10, offset, 35, 63, 84);
          }

          offset += 65;
        }
      }
    });

    obj_database.UpdateObject("keypad", keypad);
    room.AddObject(keypad);
  }

  function addDoors(room: Room): void {
    const door1 = new Door();
    door1.SetPosition(0, 0, 350, 181);
    door1.SetDestination("Room23");
    door1.SetClickSound("walk_computer");
    room.AddDoor(door1);
  }
}
