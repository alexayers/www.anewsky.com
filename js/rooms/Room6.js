/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room6() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room6/room6_1b.png",
            "img/rooms/room6/room6_2b.png",
            "img/rooms/room6/room6_3b.png"
            );
                
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);
        
        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room6/room6_1m.png",
            "img/rooms/room6/room6_2m.png",
            "img/rooms/room6/room6_3m.png",
            "img/rooms/room6/room6_4m.png",
            "img/rooms/room6/room6_5m.png"
            );
                
        middleground_layer.SetAnimationRate(30);
        room.SetMiddlegroundLayer(middleground_layer);
        room.SetAmbient("wind");

        this.AddDoors(room);
        scene.AddBackground("Room6", room);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room4");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(281, 0, 350, 350);
        door2.SetDestination("Room7");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
    }
    
    this.Init();	
}