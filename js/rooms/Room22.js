/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room22() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room22.png");
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("waves");
        this.AddDoors(room);

        scene.AddBackground("Room22", room);
    }

    this.AddDoors = function (room) {
       door1 = new Door();
       door1.SetPosition(0, 0, 350, 350);
       door1.SetDestination("Room12");
       door1.SetClickSound("walk_sand");
       room.AddDoor(door1); 
        
       door2 = new Door();
       door2.SetPosition(0, 0, 350, 350);
       door2.SetDestination("Room29");
       door2.LockDoor();
       door2.SetClickSound("walk_sand");
       room.AddDoor(door2);
       door_database.UpdateDoor("energydoor_room22", door2);
    }
    
    this.Init();	
}