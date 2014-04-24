/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room10() {
   
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room10/room10_1b.png",
            "img/rooms/room10/room10_2b.png",
            "img/rooms/room10/room10_3b.png"
            );
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages( 
            "img/rooms/room10/room10_1m.png",
            "img/rooms/room10/room10_2m.png",
            "img/rooms/room10/room10_3m.png",
            "img/rooms/room10/room10_2m.png"
            );
        middleground_layer.SetAnimationRate(15);
        room.SetMiddlegroundLayer(middleground_layer);
        
        foreground_layer = new Layer();
        foreground_layer.LoadImages(
            "img/rooms/room10/room10_1f.png",
            "img/rooms/room10/room10_2f.png",
            "img/rooms/room10/room10_3f.png",
            "img/rooms/room10/room10_4f.png",
            "img/rooms/room10/room10_4f.png"
            );
        
        foreground_layer.SetAnimationRate(25);
        room.SetForegroundLayer(foreground_layer);
        room.SetAmbient("wind");

        this.AddObjects(room);
        this.AddDoors(room);
        

        scene.AddBackground("Room10", room);
    }
    
    this.AddObjects = function (room) {
        parachute = new Object("itembox");
        parachute.SetPosition(219, 66, 297, 281);
        parachute.SetClickSound("sail");
        parachute.SetImage("img/objects/parachute.png");

        parachute.SetTitle("parachute");
        parachute.SetClickCallBack( function (x,y) {
            middleground_layer = new Layer();
            middleground_layer.LoadImages("img/rooms/room10/room10_no_chute_m.png");
            room.SetMiddlegroundLayer(middleground_layer);
        });
        
        obj_database.UpdateObject("parachute", parachute);
        room.AddObject(parachute);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room9");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
    }
    
    
    this.Init();
}