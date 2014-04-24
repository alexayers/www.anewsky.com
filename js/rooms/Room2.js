/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room2() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room2/room2_1b.png");
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("bad_light");

        this.AddDoors(room);
        
        scene.AddBackground("Room2", room);
    }

    this.AddDoors = function (room) {
       door1 = new Door();
       door1.SetPosition(298, 0, 350, 350);
       door1.SetDestination("Room1");
       door1.SetClickSound("walk_building");
       door1.SetTitle("Prison Door");
       room.AddDoor(door1);
       
       door2 = new Door();
       door2.SetPosition(0, 121, 50, 333);
       door2.SetDestination("Room3");
       door2.SetTitle("Closet door");
       door2.SetClickSound("key_locked");
       door2.LockDoor();
       door2.SetKey("key");
       room.AddDoor(door2);
       
       door3 = new Door();
       door3.SetPosition(154, 201, 242, 267);
       door3.SetDestination("Room27");
       door3.SetTitle("Bed");
       door3.SetClickSound("walk_building");
       room.AddDoor(door3);
    }
    
    this.Init();	
}