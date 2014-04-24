/*
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Prison Room

@author: Alex Ayers
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
*/

function Room7() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room7/room7_1b.png",
            "img/rooms/room7/room7_2b.png",
            "img/rooms/room7/room7_3b.png"
            );
        
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages("img/rooms/room7/room7_1m.png");
        middleground_layer.SetAnimationRate(30);
       
        room.SetMiddlegroundLayer(middleground_layer);
        room.SetAmbient("wind");

        this.AddDoors(room);
        
        scene.AddBackground("Room7", room);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room6");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(281, 0, 350, 350);
        door2.SetDestination("Room8");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
       
        door3 = new Door();
        door3.SetPosition(132, 187, 201, 243);
        door3.SetDestination("Room20");
        door3.SetClickSound("walk_ladder");
        room.AddDoor(door3);
       
     
    }
        
    this.Init();	
}