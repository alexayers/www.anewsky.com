/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room19() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room19/room19_1b.png",
            "img/rooms/room19/room19_2b.png",
            "img/rooms/room19/room19_3b.png"
            );
        
        background_layer.SetAnimationRate(30);
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("maproom");
        
        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room19/room19_1m.png",
            "img/rooms/room19/room19_2m.png",
            "img/rooms/room19/room19_3m.png",
            "img/rooms/room19/room19_4m.png",
            "img/rooms/room19/room19_5m.png",
            "img/rooms/room19/room19_6m.png"
            );
        
        middleground_layer.SetAnimationRate(30);
        room.SetMiddlegroundLayer(middleground_layer);

        this.AddDoors(room);
        
        scene.AddBackground("Room19", room);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 46, 350);
        door1.SetDestination("Room18");
        door1.SetClickSound("ogg/walk_building");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(109, 154, 163, 207);
        door2.SetDestination("Room25");
        door2.SetClickSound("walk_computer");
        room.AddDoor(door2);
       
        door3 = new Door();
        door3.SetClickSound("walk_computer");
        door3.SetDestination("Room30");
        door3.SetPosition(185, 221, 254, 257);
        room.AddDoor(door3);
    }
    
    this.Init();
}