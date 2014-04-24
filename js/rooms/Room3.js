/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room3() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room3/room3_1b.png");
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("bad_light");

        this.AddDoors(room);
        
        scene.AddBackground("Room3", room);
    }
    
    this.AddDoors = function (room) {
       door1 = new Door();
       door1.SetPosition(295, 119, 350, 333);
       door1.SetDestination("Room2");
       door1.SetClickSound("unlock_door");
       room.AddDoor(door1);
       
       door2 = new Door();
       door2.SetPosition(158, 102, 233, 138);
       door2.SetDestination("Room31");
       door2.SetClickSound("open_toolbox");
       room.AddDoor(door2);
    }

    this.Init();	
}