/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room28() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room28/room28_1b.png");

        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("wind");

        this.AddObjects(room);
        this.AddDoors(room);
        
        scene.AddBackground("Room28", room);
    }
    
    this.AddObjects = function (room) {
        keycard = new Object("hitbox");
        keycard.SetPosition(74, 83, 234, 153);
        keycard.SetClickSound("pickup");
        keycard.SetImage("img/objects/keycard.png");
        keycard.SetTitle("keycard");
        
        keycard.SetClickCallBack( function (x,y) {
            background_layer = new Layer();
            background_layer.LoadImages("img/rooms/room28/room28_1bb.png");
            room.SetMiddlegroundLayer(background_layer);
            keycard.Destroy();
        });
        
        obj_database.UpdateObject("keycard", keycard);
        room.AddObject(keycard);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 197, 350, 350);
        door1.SetDestination("Room4");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
        
        door2 = new Door();
        door2.SetPosition(0, 0, 350, 66);
        door2.SetDestination("Room4");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
    }
    
    this.Init();		
}