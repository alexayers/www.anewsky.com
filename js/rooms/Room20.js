/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room20() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room20.png");
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("waves");

        this.AddDoors(room);
        scene.AddBackground("Room20", room);
    }
    
    this.AddDoors = function (room) {
       door1 = new Door();
       door1.SetPosition(0, 0, 63, 350);
       door1.SetDestination("Room21");
       door1.SetClickSound("walk_sand");
       room.AddDoor(door1);
       
       door2 = new Door();
       door2.SetPosition(281, 0, 350, 350);
       door2.SetDestination("Room12");
       door2.SetClickSound("walk_sand");
       room.AddDoor(door2);
              
       door3 = new Door();
       door3.SetPosition(129, 0, 215, 260);
       door3.SetDestination("Room7");
       door3.SetClickSound("walk_ladder");
       room.AddDoor(door3);
    }
    
    this.Init();	
}