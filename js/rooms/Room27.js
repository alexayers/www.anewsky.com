/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room27() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room27/room27_1b.png");

        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("bad_light");

        this.AddObjects(room);
        this.AddDoors(room);
        

        scene.AddBackground("Room27", room);
    }
    
    this.AddObjects = function (room) {
        photo = new Object("itembox");
        photo.SetPosition(66, 180, 140, 215);
        photo.SetClickSound("pickup");
        photo.SetImage("img/objects/photo.png");
        photo.SetTitle("photo");
        
        photo.SetClickCallBack( function (x,y) {
            background_layer = new Layer();
            background_layer.LoadImages("img/rooms/room27/room27_1bb.png");
            room.SetMiddlegroundLayer(background_layer);
        });
        
        obj_database.UpdateObject("photo", photo);
        room.AddObject(photo);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 350, 145);
        door1.SetDestination("Room2");
        door1.SetClickSound("walk_building");
        room.AddDoor(door1);
        
        door2 = new Door();
        door2.SetPosition(0, 237, 350, 350);
        door2.SetDestination("Room2");
        door2.SetClickSound("walk_building");
        room.AddDoor(door2);
    }
    
    this.Init();	
}