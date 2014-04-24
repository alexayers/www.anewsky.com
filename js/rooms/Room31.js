/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room31() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room31/room31_1b.png");
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("bad_light");

        this.AddObjects(room);
        this.AddDoors(room);
        
        scene.AddBackground("Room31", room);
    }
    
    this.AddObjects = function (room) {
        toolbox = new Object("hitbox");
        toolbox.SetPosition(128, 164, 294, 230);
        toolbox.SetTitle("cardreader");

        toolbox.SetClickCallBack(function (x,y) {
            sound_engine.PlaySound("pickup");

            background_layer = new Layer();
            background_layer.LoadImages("img/rooms/room31/room31_1bb.png");
            room.SetBackgroundLayer(background_layer);
            
            hammer = new Object("itembox");
            hammer.SetImage("img/objects/hammer.png");
            hammer.SetTitle("hammer");
            obj_database.UpdateObject("hammer", hammer);
            inventory.AddItem(hammer);
            
            toolbox.Destroy();
        });
        
        obj_database.UpdateObject("toolbox", toolbox);
        room.AddObject(toolbox);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 350, 130);
        door1.SetDestination("Room3");
        door1.SetClickSound("open_toolbox");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(0, 239, 350, 350);
        door2.SetDestination("Room3");
        door2.SetClickSound("open_toolbox");
        room.AddDoor(door2);
    }

    this.Init();	
}