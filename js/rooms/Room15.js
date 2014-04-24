/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room15() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room15/room15_1b.png",
            "img/rooms/room15/room15_2b.png",
            "img/rooms/room15/room15_3b.png",
            "img/rooms/room15/room15_4b.png"
            );
        
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);
      
        foreground_layer = new Layer();
        foreground_layer.LoadImages("img/rooms/room15/room15_1f.png");
        room.SetForegroundLayer(foreground_layer);
        
        room.SetAmbient("cave");

        this.AddDoors(room);
        scene.AddBackground("Room15", room);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room24");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(315, 0, 350, 350);
        door2.SetDestination("Room16");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
       
        door3 = new Door();
        door3.SetPosition(84, 98, 267, 258);
        door3.SetDestination("Room13");
        door3.SetClickSound("walk_sand");
        room.AddDoor(door3);
    }
    
    this.Init();	
}