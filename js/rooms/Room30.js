/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room30() {
    
    this.Init = function() {
        room = new Room();
        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room30/room30_1b.png");
        room.SetBackgroundLayer(background_layer);
        
        middleground_layer = new Layer();
        middleground_layer.SetAnimationRate(15);
        middleground_layer.LoadImages(
            "img/rooms/room30/room30_1m.png",
            "img/rooms/room30/room30_2m.png",
            "img/rooms/room30/room30_3m.png",
            "img/rooms/room30/room30_4m.png"
            );
                
        room.SetMiddlegroundLayer(middleground_layer);
        room.SetAmbient("maproom");

        this.AddObjects(room);
        this.AddDoors(room);
        
        scene.AddBackground("Room30", room);
    }
    
    this.AddObjects = function (room) {
        mappad_enter = new Object("hitbox");
        mappad_enter.SetClickSound("computer_walk");
        mappad_enter.SetPosition(12, 305, 74, 339);
        mappad_enter.SetTitle("mappad_enter");
        
        mappad_enter.SetClickCallBack(function (x,y) {
            mappad = obj_database.GetObject("mappad");
            value = mappad.GetValue();
            
            value = value.split(",");
            
            current_x = value[0];
            current_y = value[1];
            
            if (current_x == 4 && current_y == 3) {
                sound_engine.PlaySound("pick_keycard");
                
                mappad_enter.SetValue("ready");
                obj_database.UpdateObject("mappad_enter", mappad_enter);
                
                room25 = scene.GetRoom("Room25");
  
                foreground_layer = new Layer();
                foreground_layer.LoadImages("img/rooms/room25/room25_1f_map.png");
                room25.SetForegroundLayer(foreground_layer);
                scene.UpdateRoom("Room25", room25);
  
                background_layer = new Layer();
                background_layer.LoadImages("img/rooms/room30/room30_1bd.png");
                room.SetBackgroundLayer(background_layer);
                
            } else {
                sound_engine.PlaySound("bad_code");
                mappad_enter.SetValue("");
            }
        });
        
        obj_database.UpdateObject("mappad_enter", keypad_enter);
        room.AddObject(mappad_enter);
        
        mappad = new Object("hitbox");
        mappad.SetClickSound("computer_type");
        mappad.SetPosition(107, 297, 315, 337);
        mappad.SetTitle("mappad");
        mappad.SetValue("0,0");
  
        mappad.SetClickCallBack(function (x,y) {
            
            mappad_enter = obj_database.GetObject("mappad_enter");

            if (mappad_enter.GetValue() != "ready") { // map is ready
       
                sound_engine.PlaySound("good_code");
               
            
                mappad = obj_database.GetObject("mappad");
                var value = mappad.GetValue();
                value = value.split(",");
            
                current_x = value[0];
                current_y = value[1];
            
                if (x >= 110 && x <= 140 &&
                    y >= 308 && y <= 337) {
                    if (current_y < 4) {
                        current_y++;
                    }
                
                } else if (x >= 162 && x <= 195 &&
                    y >= 308 && y <= 337) {
                    if (current_y > 0) {
                        current_y--;
                    }
                } else if (x >= 218 && x <= 250 &&
                    y >= 308 && y <= 337) {
                    if (current_x > 0) {
                        current_x--;
                    }
                } else if (x >= 271 && x <= 382 &&
                    y >= 308 && y <= 337) {
                    if (current_x < 5) {
                        current_x++;
                    }
                } 
            
                value = current_x + "," + current_y;
                console.log("Setting value to " + value);
                mappad.SetValue(value);
            } else {
                sound_engine.PlaySound("bad_code");
                
            }
        });

        mappad.SetRenderCallBack(function () {
            var canvas = document.getElementById("Viewport");
            var context = canvas.getContext("2d");
            mappad = obj_database.GetObject("mappad");
            value = mappad.GetValue();
            
            var crosshair = new Image();
            crosshair.src = "img/objects/crosshair.png";

            value = value.split(",");
            
            x = value[0];
            y = value[1];
            
            var x_offset = 55;
            var y_offset = 33;
                
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 6; c++) {
                    if (c == x && r == y) {
                        context.drawImage(crosshair,x_offset,y_offset,32,32);
                    }
                        
                    x_offset += 44;
                } 
                    
                x_offset = 55;
                y_offset += 44 
            }
        });
        
        obj_database.UpdateObject("mappad", mappad);
        room.AddObject(mappad);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetClickSound("walk_computer");
        door1.SetDestination("Room19");
        door1.SetPosition(0, 0, 47, 296);
        room.AddDoor(door1);
        
        door2 = new Door();
        door2.SetClickSound("walk_computer");
        door2.SetDestination("Room19");
        door2.SetPosition(291, 0, 350, 296);
        room.AddDoor(door2);
    }
    
    this.Init();		
}