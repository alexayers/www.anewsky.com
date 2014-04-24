/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room4() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room4/room4_1b.png",
            "img/rooms/room4/room4_2b.png",
            "img/rooms/room4/room4_3b.png"
            );
        
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);
        
        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room4/room4_1m.png",
            "img/rooms/room4/room4_2m.png",
            "img/rooms/room4/room4_3m.png"
            );
        middleground_layer.SetAnimationRate(30);
        room.SetMiddlegroundLayer(middleground_layer);
        
        foreground_layer = new Layer();
        foreground_layer.LoadImages(
            "img/rooms/room4/room4_1f.png",
            "img/rooms/room4/room4_2f.png",
            "img/rooms/room4/room4_3f.png"
            );
        
        foreground_layer.SetAnimationRate(70);
        room.SetForegroundLayer(foreground_layer);
        room.SetAmbient("wind");

        this.AddObjects(room);
        this.AddDoors(room);
        

        scene.AddBackground("Room4", room);
    }
    
    this.AddObjects = function (room) {
        keycard = new Object("itembox");
        keycard.SetPosition(87, 295, 120, 317);
        keycard.SetClickSound("pickup");
        keycard.SetImage("img/objects/keycard.png");
        keycard.SetTitle("keycard");
                
        keycard.SetClickCallBack( function (x,y) {

            foreground_layer = new Layer();
            foreground_layer.LoadImages(
                "img/rooms/room4/room4_1fb.png",
                "img/rooms/room4/room4_2fb.png",
                "img/rooms/room4/room4_3fb.png"
                );
            
            foreground_layer.SetAnimationRate(70);
            room.SetForegroundLayer(foreground_layer);
            
            keycard.Destroy();
            
        });
        obj_database.UpdateObject("keycard", keycard);
        room.AddObject(keycard);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 44, 350);
        door1.SetDestination("Room5");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(289, 0, 350, 350);
        door2.SetDestination("Room6");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
      
        door3 = new Door();
        door3.SetPosition(77, 140, 157, 265);
        door3.SetDestination("Room1");
        door3.SetClickSound("slide_door");
        room.AddDoor(door3);
    }
    
    this.Init();	
}