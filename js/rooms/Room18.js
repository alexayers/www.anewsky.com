/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */

function Room18() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room18/room18_1b.png");
        room.SetBackgroundLayer(background_layer);
        

        middleground_layer = new Layer();
        middleground_layer.LoadImages( 
            "img/rooms/room18/room18_1m.png",
            "img/rooms/room18/room18_2m.png",
            "img/rooms/room18/room18_3m.png",
            "img/rooms/room18/room18_4m.png",
            "img/rooms/room18/room18_3m.png",
            "img/rooms/room18/room18_2m.png"
            );
        
        middleground_layer.SetAnimationRate(20);
        room.SetMiddlegroundLayer(middleground_layer);

        foreground_layer = new Layer();
        foreground_layer.LoadImages("img/rooms/room18/room18_1f.png");
        room.SetForegroundLayer(foreground_layer);
        
        room.SetAmbient("maproom");

        this.AddObjects(room);
        this.AddDoors(room);
        

        scene.AddBackground("Room18", room);
    }
    
    this.AddObjects = function (room) {
        wall_shovel = new Object("hitbox");
        wall_shovel.SetClickSound("pickup");
        wall_shovel.SetPosition(90, 183, 118, 269);
        wall_shovel.SetTitle("wall_shovel");
        wall_shovel.SetClickCallBack(function (x,y) {
            foreground_layer = new Layer();
            foreground_layer.LoadImages("img/objects/nothing.png");
            room.SetForegroundLayer(foreground_layer);
            
            shovel = new Object("itembox");
            shovel.SetTitle("shovel");
            shovel.SetImage("img/objects/shovel.png");
            obj_database.UpdateObject("shovel", shovel);
            inventory.AddItem(shovel);
            
            wall_shovel.Destroy();
            
        });
        
        obj_database.UpdateObject("wall_shovel", wall_shovel);
        room.AddObject(wall_shovel);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(286, 0, 350, 350);
        door1.SetDestination("Room19");
        door1.SetClickSound("walk_building");
        room.AddDoor(door1);

        door2 = new Door();
        door2.SetPosition(131, 142, 248, 267);
        door2.SetDestination("Room5");
        door2.SetClickSound("slide_door");
        room.AddDoor(door2);
    }
    
    this.Init();	
}