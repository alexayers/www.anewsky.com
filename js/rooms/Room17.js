/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room17() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room17/room17_1b.png");
        room.SetBackgroundLayer(background_layer);
        
        middleground_layer = new Layer();
        middleground_layer.SetAnimationRate(15);
        middleground_layer.LoadImages(
            "img/rooms/room17/room17_1m.png",
            "img/rooms/room17/room17_2m.png",
            "img/rooms/room17/room17_3m.png"
            );
        room.SetMiddlegroundLayer(middleground_layer);

        foreground_layer = new Layer();
        foreground_layer.LoadImages("img/rooms/room17/room17_1f.png");
        room.SetForegroundLayer(foreground_layer);
        
        room.SetAmbient("cave");

        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room17", room);
    }
    
    this.AddObjects = function (room) {
        glassdoor = new Object("hitbox");
        glassdoor.SetPosition(98, 78, 251, 175);
        glassdoor.SetClickCallBack(function (x,y) {
            generator = obj_database.GetObject("generator");
            power = generator.GetValue();
           
            if (power == "powered") {
                sound_engine.PlaySound("open_compartment");

                foreground_layer = new Layer();
                foreground_layer.LoadImages("img/objects/nothing.png");
                room.SetForegroundLayer(foreground_layer);

                middleground_layer = new Layer();
                middleground_layer.LoadImages("img/objects/nothing.png");
                room.SetMiddlegroundLayer(middleground_layer);
                
                pink_crystal = new Object("itembox");
                pink_crystal.SetTitle("pink_crystal");
                pink_crystal.SetFriendlyTitle("pink crystal");
                pink_crystal.SetImage("img/objects/pink_crystal.png");
                
                obj_database.UpdateObject("pink_crystal", pink_crystal);
                inventory.AddItem(pink_crystal);
            
                glassdoor.Destroy();
            } else {
                glassdoor.SetClickSound("touch_glass");
            }
        });
       
        room.AddObject(glassdoor);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room16");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
    }
    
    this.Init();	
}