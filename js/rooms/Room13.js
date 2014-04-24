/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room13() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room13/room13_1b.png");
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("waves");

        this.AddDoors(room);

        scene.AddBackground("Room13", room);
    }
    
    this.AddDoors = function (room) {
       door1 = new Door();
       door1.SetPosition(0, 0, 63, 350);
       door1.SetDestination("Room12");
       door1.SetClickSound("walk_sand");
       room.AddDoor(door1);
       
       door2 = new Door();
       door2.SetPosition(283, 0, 350, 350);
       door2.SetDestination("Room14");
       door2.SetClickSound("walk_sand");
       room.AddDoor(door2);
       
       door3 = new Door();
       door3.SetPosition(114, 88, 265, 257);
       door3.SetDestination("Room15");
       door3.SetClickSound("walk_sand");
       room.AddDoor(door3);
    }
    
    this.Init();	
}