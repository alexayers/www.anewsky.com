/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room23() {

    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room23/room23_1b.png");
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room23/room23_1m.png",
            "img/rooms/room23/room23_2m.png",
            "img/rooms/room23/room23_3m.png",
            "img/rooms/room23/room23_4m.png",
            "img/rooms/room23/room23_4m.png",
            "img/rooms/room23/room23_4m.png",
            "img/rooms/room23/room23_4m.png",
            "img/rooms/room23/room23_4m.png",
            "img/rooms/room23/room23_4m.png"
            );
                
        middleground_layer.SetAnimationRate(10);
        room.SetMiddlegroundLayer(middleground_layer);
        room.SetAmbient("waves");

        this.AddDoors(room);
        scene.AddBackground("Room23", room);
    }

    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 350, 187);
        door1.SetDestination("Room12");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);

        door2 = new Door();
        door2.SetPosition(210, 261, 350, 350);
        door2.SetDestination("Room12");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
        
        door3 = new Door();
        door3.SetPosition(0, 196, 65, 233);
        door3.SetDestination("Room26");
        door3.SetClickSound("walk_computer");
        room.AddDoor(door3);
    }
    
    this.Init();	
}