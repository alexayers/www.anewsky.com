/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room25() {

    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room25/room25_1b.png",
            "img/rooms/room25/room25_2b.png",
            "img/rooms/room25/room25_3b.png",
            "img/rooms/room25/room25_4b.png"
            );
                
        background_layer.SetAnimationRate(15);
        
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("maproom");

        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room25", room);
    }
    
    this.AddObjects = function (room) {
        computer = new Object("hitbox");
        computer.SetPosition(53, 219, 106, 252);
        computer.SetClickSound("pick_keycard");
        computer.SetTitle("computer");


        computer.SetClickCallBack( function (x,y) {
            if (inventory.IsSelectedItem("storage_device")) {
                background_layer = new Layer();
                background_layer.LoadImages(
                    "img/rooms/room25/room25_1bb.png",
                    "img/rooms/room25/room25_2bb.png",
                    "img/rooms/room25/room25_3bb.png",
                    "img/rooms/room25/room25_4bb.png"
                    );
                
                background_layer.SetAnimationRate(15);
                room.SetBackgroundLayer(background_layer);

                middleground_layer = new Layer();
                middleground_layer.LoadImages("img/rooms/room25/room25_1m.png");
                room.SetMiddlegroundLayer(middleground_layer);
                
                mappad_enter = obj_database.GetObject("mappad_enter");
                
                if (mappad_enter.GetValue() == "ready") { // map is ready
                    foreground_images = "img/rooms/room25/room25_1f_map.png";
                } else { // map isn't ready
                    foreground_images = "img/rooms/room25/room25_1f.png";
                }

                foreground_layer = new Layer();
                foreground_layer.LoadImages(foreground_images);
                room.SetForegroundLayer(foreground_layer);

                inventory.RemoveCurrentItem();
            }
        });
        
        obj_database.UpdateObject("computer", computer);
        room.AddObject(computer);
        
        mapload_enter = new Object("hitbox");
        mapload_enter.SetTitle("mapload_enter");
        mapload_enter.SetPosition(240, 271, 304, 306);
        
        mapload_enter.SetClickCallBack(function () {
            mappad_enter = obj_database.GetObject("mappad_enter");
     
            if (mappad_enter.GetValue() == "ready") {
                sound_engine.PlaySound("good_code");

                storage_device = obj_database.GetObject("storage_device");
                storage_device.SetValue("gps_loaded")
                storage_device.SetFriendlyTitle("GPS device");
                storage_device.SetImage("img/objects/storage.png");

                obj_database.UpdateObject("storage_device", storage_device);
                inventory.AddItem(storage_device);
            
                mapload_enter.Destroy();

                middleground_layer = new Layer();
                middleground_layer.LoadImages("img/objects/nothing.png");
                room.SetMiddlegroundLayer(middleground_layer);
 
                foreground_layer = new Layer();
                foreground_layer.LoadImages("img/rooms/room25/room25_1f_storage.png");
                room.SetForegroundLayer(foreground_layer);
            } else {
                sound_engine.PlaySound("bad_code");
                
            } 
        });
        
        obj_database.UpdateObject("mapload_enter", mapload_enter);
        room.AddObject(mapload_enter);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 47, 253);
        door1.SetDestination("Room19");
        door1.SetClickSound("walk_building");
        room.AddDoor(door1);
        
        door2 = new Door();
        door2.SetPosition(291, 0, 350, 249);
        door2.SetDestination("Room19");
        door2.SetClickSound("walk_building");
        room.AddDoor(door2);
    }
    
    this.Init();	
}