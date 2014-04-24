/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room26() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room26/room26_1b.png");

        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("spaceship");

        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room26", room);
    }
    
    this.AddObjects = function (room) {
        keypad_enter = new Object("hitbox");
        keypad_enter.SetClickSound("walk_computer");
        keypad_enter.SetPosition(222, 120, 329, 164);
        keypad_enter.SetTitle("keypad");
        
        keypad_enter.SetClickCallBack(function (x,y) {
            keypad = obj_database.GetObject("keypad");
            value = keypad.GetValue();
            
            if (value == "7,3,2,9,6,") {
                background_layer = new Layer();
                background_layer.LoadImages("img/rooms/room26/room26_1bb.png");
                room.SetBackgroundLayer(background_layer);
                
                sound_engine.PlaySound("good_code");
                sound_engine.PlaySound("open_compartment");
                
                door_database.UnlockDoor("energydoor_room22");
                
                room12 = scene.GetRoom("Room12");
                
                background_layer = new Layer();
                background_layer.LoadImages(
                    "img/rooms/room12/room12_1bb.png",
                    "img/rooms/room12/room12_2bb.png",
                    "img/rooms/room12/room12_3bb.png",
                    "img/rooms/room12/room12_4bb.png"
                    );
        
                background_layer.SetAnimationRate(25)
                room12.SetBackgroundLayer(background_layer);

                door12 = door_database.GetDoor("energydoor_room12");
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
        
        obj_database.UpdateObject("keypad_enter", keypad_enter);
        room.AddObject(keypad_enter);
        
        keypad = new Object("hitbox");
        keypad.SetClickSound("computer_type");
        keypad.SetPosition(22, 200, 330, 341);
        keypad.SetTitle("keypad");

        keypad.SetClickCallBack(function (x,y) {
            keypad = obj_database.GetObject("keypad");
            
            var value = keypad.GetValue();
            
            if (value.length == 10) {
                console.log("Keypad full.");
                return;
            }
            
            if (x >= 23 && x <= 65 &&
                y >= 197 && y <= 261) {
                value += "1,";
            } else if (x >= 77 && x <= 130 &&
                y >= 197 && y <= 261) {
                value += "2,";
            } else if (x >= 141 && x <= 196 &&
                y >= 197 && y <= 261) {
                value += "3,";
            } else if (x >= 208 && x <= 262 &&
                y >= 197 && y <= 261) {
                value += "4,";
            } else if (x >= 273 && x <= 326 &&
                y >= 197 && y <= 261) {
                value += "5,";
            } else if (x >= 23 && x <= 65 &&
                y >= 273 && y <= 337) {
                value += "6,";
            } else if (x >= 77 && x <= 130 &&
                y >= 273 && y <= 337) {
                value += "7,";
            } else if (x >= 141 && x <= 196 &&
                y >= 273 && y <= 337) {
                value += "8,";
            } else if (x >= 208 && x <= 262 &&
                y >= 273 && y <= 337) {
                value += "9,";
            } else if (x >= 273 && x <= 326 &&
                y >= 273 && y <= 337) {
                value += "a,";
            }
            
            console.log(value);
            keypad.SetValue(value);
            
        });
        
        keypad.SetRenderCallBack(function () {
            var canvas = document.getElementById("Viewport");
            var context = canvas.getContext("2d");
            keypad = obj_database.GetObject("keypad");
            value = keypad.GetValue();
            
            var button_1 = new Image();
            var button_2 = new Image();
            var button_3 = new Image();
            var button_4 = new Image();
            var button_5 = new Image();
            var button_6 = new Image();
            var button_7 = new Image();
            var button_8 = new Image();
            var button_9 = new Image();
            var button_10 = new Image();
            
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
            
            
            if (value != "") {
                value = value.split(",");
                total = value.length;
                var offset = 5;
                
                for (var i = 0; i < total; i++) {
                    if (value[i] == "1") {
                        context.drawImage(button_1,offset,35,63,84);
                    } else if (value[i] == "2") {
                        context.drawImage(button_2,offset,35,63,84);
                    } else if (value[i] == "3") {
                        context.drawImage(button_3,offset,35,63,84);
                    } else if (value[i] == "4") {
                        context.drawImage(button_4,offset,35,63,84);
                    } else if (value[i] == "5") {
                        context.drawImage(button_5,offset,35,63,84);
                    } else if (value[i] == "6") {
                        context.drawImage(button_6,offset,35,63,84);
                    } else if (value[i] == "7") {
                        context.drawImage(button_7,offset,35,63,84);
                    } else if (value[i] == "8") {
                        context.drawImage(button_8,offset,35,63,84);
                    } else if (value[i] == "9") {
                        context.drawImage(button_9,offset,35,63,84);
                    } else if (value[i] == "a") {
                        context.drawImage(button_10,offset,35,63,84);
                    }
                    
                    offset += 65;
                    
                }
            }
            
        });
        
        obj_database.UpdateObject("keypad", keypad);
        room.AddObject(keypad);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 350, 181);
        door1.SetDestination("Room23");
        door1.SetClickSound("walk_computer");
        room.AddDoor(door1);
    }
    
    this.Init();	
}