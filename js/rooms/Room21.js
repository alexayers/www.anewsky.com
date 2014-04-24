/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room21() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room21/room21_1b.png");
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room21/room21_1m.png",
            "img/rooms/room21/room21_2m.png",
            "img/rooms/room21/room21_3m.png",
            "img/rooms/room21/room21_4m.png",
            "img/rooms/room21/room21_3m.png",
            "img/rooms/room21/room21_2m.png"
            );
                
        middleground_layer.SetAnimationRate(50);
        room.SetMiddlegroundLayer(middleground_layer);

        foreground_layer = new Layer();
        foreground_layer.LoadImages(
            "img/rooms/room21/room21_1f.png",
            "img/rooms/room21/room21_2f.png",
            "img/rooms/room21/room21_3f.png",
            "img/rooms/room21/room21_2f.png"
            );
                
        foreground_layer.SetAnimationRate(20);
        
        room.SetForegroundLayer(foreground_layer);
        room.SetAmbient("waves");

        this.AddObjects(room);
        this.AddDoors(room);
        

        scene.AddBackground("Room21", room);
    }
    
    this.AddObjects = function (room) {
        sailboat = new Object("hitbox");
        sailboat.SetPosition(98, 61, 226, 279);
        sailboat.SetTitle("sailboat");
        
        sailboat.SetClickCallBack( function (x,y) {
            if (inventory.IsSelectedItem("parachute")) {
                sound_engine.PlaySound("sail");
                sailboat.SetValue("ready");

                foreground_layer = new Layer();
                foreground_layer.LoadImages(
                    "img/rooms/room21/room21_1fb.png",
                    "img/rooms/room21/room21_2fb.png",
                    "img/rooms/room21/room21_3fb.png",
                    "img/rooms/room21/room21_2fb.png"    
                    );
                        
                foreground_layer.SetAnimationRate(20);
                room.SetForegroundLayer(foreground_layer);
                inventory.RemoveCurrentItem();
            }
        });
        
        obj_database.UpdateObject("sailboat", sailboat);
        room.AddObject(sailboat);

    }
    
    this.AddDoors = function (room) {       
        door1 = new Door();
        door1.SetPosition(297, 0, 350, 350);
        door1.SetDestination("Room20");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(250, 152, 288, 219);
        door2.SetDestination("Room33");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
    }
    
    this.Init();	
}