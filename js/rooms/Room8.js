/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room8() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room8/room8_1b.png",
            "img/rooms/room8/room8_2b.png",
            "img/rooms/room8/room8_3b.png"
            );
        
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room8/room8_1m.png",
            "img/rooms/room8/room8_2m.png",
            "img/rooms/room8/room8_3m.png",
            "img/rooms/room8/room8_4m.png",
            "img/rooms/room8/room8_3m.png",
            "img/rooms/room8/room8_2m.png"
            );
        
        middleground_layer.SetAnimationRate(30);
        room.SetMiddlegroundLayer(middleground_layer);
        
        room.SetAmbient("wind");

        this.AddDoors(room);
        scene.AddBackground("Room8", room);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room7");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(281, 0, 350, 350);
        door2.SetDestination("Room9");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
    }
    
    this.Init();
}