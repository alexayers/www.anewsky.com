/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room34() {

    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room34/ending_0.png",
            "img/rooms/room34/ending_1.png",
            "img/rooms/room34/ending_2.png"
            );
                
        background_layer.SetAnimationRate(150);
        background_layer.DoNotLoop();
        room.SetBackgroundLayer(background_layer);
        
        room.SetAmbient("waves");

        this.AddDoors(room);

        scene.AddBackground("Room34", room);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(77, 142, 161, 269);
        door1.SetDestination("Room21");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1); 
    }
    
    this.Init();	
}