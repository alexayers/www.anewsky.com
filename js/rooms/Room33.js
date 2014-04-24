/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room33() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room33/room33_1b.png",
            "img/rooms/room33/room33_2b.png",
            "img/rooms/room33/room33_3b.png"
            );
        background_layer.SetAnimationRate(30);
        room.SetBackgroundLayer(background_layer);
        
        middleground_layer = new Layer();
        middleground_layer.LoadImages("img/rooms/room33/room33_1m.png");
        room.SetMiddlegroundLayer(middleground_layer);
        
        room.SetAmbient("waves");

        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room33", room);
    }
    
    this.AddObjects = function (room) {
        nav_storage = new Object("hitbox");
        nav_storage.SetPosition(41, 239, 84, 302);
        nav_storage.SetClickCallBack(function () {
            storage_device = obj_database.GetObject("storage_device");
            
            if (typeof storage_device == "undefined") {
                sound_engine.PlaySound("bad_code");
            } else if (storage_device.GetValue() == "gps_loaded") {
                sound_engine.PlaySound("good_code");
                nav_storage.Destroy();
                nav_storage.SetValue("ready");
                inventory.RemoveCurrentItem();

                middleground_layer = new Layer();
                middleground_layer.LoadImages("img/rooms/room33/room33_1mb.png");
                room.SetMiddlegroundLayer(middleground_layer);
            } else {
                sound_engine.PlaySound("bad_code");
            }
        });
       
        obj_database.UpdateObject("nav_storage", nav_storage);
        room.AddObject(nav_storage);
        
        nav_enter = new Object("hitbox");
        nav_enter.SetPosition(234, 22, 290, 257);
        nav_enter.SetClickCallBack(function () {
            nav_storage = obj_database.GetObject("nav_storage");
            sailboat = obj_database.GetObject("sailboat");
           
            if (nav_storage.GetValue() == "ready" && sailboat.GetValue("ready")) {
                scene.SetScene(34);
            } else {
                sound_engine.PlaySound("bad_code");
                
            }
        });
       
        obj_database.UpdateObject("nav_enter", nav_enter);
        room.AddObject(nav_enter);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 23, 201);
        door1.SetDestination("Room21");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1); 
        
        door2 = new Door();
        door2.SetPosition(322, 0, 350, 350);
        door2.SetDestination("Room21");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2); 
        
        door3 = new Door();
        door3.SetPosition(0, 307, 350, 350);
        door3.SetDestination("Room21");
        door3.SetClickSound("walk_sand");
        room.AddDoor(door3); 
    }
    
    this.Init();
}