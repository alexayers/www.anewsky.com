/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room32() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room32/room32_1b.png");
        room.SetBackgroundLayer(background_layer);

        foreground_layer = new Layer();
        foreground_layer.LoadImages("img/rooms/room32/room32_1f.png");
        room.SetForegroundLayer(foreground_layer);
        
        room.SetAmbient("cave");

        this.AddObjects(room);
        this.AddDoors(room);
        
        scene.AddBackground("Room32", room);
    }
    
    this.AddObjects = function (room) {
        release_storage = new Object("hitbox");
        release_storage.SetTitle("release_storage");
        release_storage.SetPosition(249, 247, 320, 284);
        release_storage.SetClickSound("good_code");
        release_storage.SetClickCallBack(function () {
            release_storage.SetValue("safely_remove");

            background_layer = new Layer();
            background_layer.LoadImages("img/rooms/room32/room32_1bb.png");
            room.SetBackgroundLayer(background_layer);
            
        });
        
        room.AddObject(release_storage);
        obj_database.UpdateObject("release_storage", release_storage);
        
        empty_storage = new Object("hitbox");
        empty_storage.SetTitle("empty_storage");
        empty_storage.SetPosition(72, 188, 115, 246);
        
        empty_storage.SetClickCallBack(function () {
            release_storage = obj_database.GetObject("release_storage");
            value = release_storage.GetValue();
            
            if (value == "safely_remove") {
                sound_engine.PlaySound("pickup");
                
                storage_device = new Object("itembox");
                storage_device.SetTitle("storage_device");
                storage_device.SetFriendlyTitle("empty storage device");
                storage_device.SetImage("img/objects/storage.png");
                obj_database.UpdateObject("storage_device", storage_device);
                inventory.AddItem(storage_device);
            
                empty_storage.Destroy();

                foreground_layer = new Layer();
                foreground_layer.LoadImages("img/objects/nothing.png");
                room.SetForegroundLayer(foreground_layer);
            } else {
                sound_engine.PlaySound("locked_door");
            }            
        });
        
        room.AddObject(empty_storage);
        obj_database.UpdateObject("empty_storage", empty_storage);
        
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 41, 240);
        door1.SetDestination("Room24");
        door1.SetClickSound("walk_computer");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(270, 0, 350, 230);
        door2.SetDestination("Room24");
        door2.SetClickSound("walk_computer");
        room.AddDoor(door2);
    }

    this.Init();	
}