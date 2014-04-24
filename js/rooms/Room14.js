
/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room14() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room14/room14_1b.png");
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages("img/rooms/room14/room14_1m.png");
       
        room.SetMiddlegroundLayer(middleground_layer);
        room.SetAmbient("waves");

        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room14", room);
    }
    
    this.AddObjects = function (room) {
        grave = new Object("hitbox");
        grave.SetPosition(149, 234, 206, 312);

        grave.SetClickCallBack(function (x,y) {
            if (inventory.IsSelectedItem("shovel")) {     
                sound_engine.PlaySound("dig");

                middleground_layer = new Layer();
                middleground_layer.LoadImages("img/rooms/room14/room14_1mb.png");
                room.SetMiddlegroundLayer(middleground_layer);
                inventory.RemoveCurrentItem();
                
                purple_crystal = new Object("itembox");
                purple_crystal.SetTitle("purple_crystal");
                purple_crystal.SetFriendlyTitle("purple crystal");
                purple_crystal.SetImage("img/objects/purple_crystal.png");
                
                obj_database.UpdateObject("purple_crystal", purple_crystal);
                inventory.AddItem(purple_crystal);
                
                grave.Destroy();
            }
        });
        
        obj_database.UpdateObject("grave", grave);
        room.AddObject(grave);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room13");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
    }
    
    this.Init();	
}