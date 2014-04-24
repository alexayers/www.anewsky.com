/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room16() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room16/room16_1b.png");
        room.SetBackgroundLayer(background_layer);
        
        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room16/room16_1m.png",
            "img/rooms/room16/room16_2m.png",
            "img/rooms/room16/room16_3m.png",
            "img/rooms/room16/room16_4m.png",
            "img/rooms/room16/room16_5m.png",
            "img/rooms/room16/room16_6m.png",
            "img/rooms/room16/room16_6m.png",
            "img/rooms/room16/room16_6m.png",
            "img/rooms/room16/room16_6m.png"
            );
        
        middleground_layer.SetAnimationRate(10);
        
        room.SetMiddlegroundLayer(middleground_layer);

        foreground_layer = new Layer();
        foreground_layer.LoadImages("img/rooms/room16/room16_1f.png");
        room.SetForegroundLayer(foreground_layer);
        
        room.SetAmbient("cave");

        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room16", room);
    }
    
    this.AddObjects = function (room) {
        generator = new Object("hitbox");
        generator.SetPosition(141, 164, 204, 206);
        generator.SetClickSound("empty_supply");
        generator.SetTitle("generator");
        generator.SetValue("not_powered");
        generator.SetClickCallBack(function (x,y) {
            if (inventory.IsSelectedItem("power_cell")) {
                sound_engine.PlaySound("remove_power");
                generator = obj_database.GetObject("generator");
                generator.SetValue("powered");
                obj_database.UpdateObject("generator", generator);
                
                inventory.RemoveCurrentItem();
                
                foreground_layer = new Layer();
                foreground_layer.LoadImages("img/rooms/room16/room16_1fb.png");
                room.SetForegroundLayer(foreground_layer);
                
                room24 = scene.GetRoom("Room24");
                background_layer = new Layer();
                background_layer.LoadImages("img/rooms/room24/room24_1bb.png");
                room24.SetBackgroundLayer(background_layer);
                scene.UpdateRoom("Room24", room24);

                
                room17 = scene.GetRoom("Room17");
                foreground_layer = new Layer();
                foreground_layer.LoadImages("img/objects/nothing.png");
                room17.SetForegroundLayer(foreground_layer);
                scene.UpdateRoom("Room17", room17);
                
            }
        });
        
        room.AddObject(generator);
        obj_database.UpdateObject("generator", generator);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room15");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(315, 0, 350, 350);
        door2.SetDestination("Room17");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
    }
    
    this.Init();	
}