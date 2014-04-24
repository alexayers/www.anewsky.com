/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room1() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room1/room1_1b.png");
        room.SetBackgroundLayer(background_layer);

        foreground_layer = new Layer();
        foreground_layer.LoadImages(
            "img/rooms/room1/room1_1f.png",
            "img/rooms/room1/room1_2f.png",
            "img/rooms/room1/room1_3f.png",
            "img/rooms/room1/room1_2f.png"
            );
                
        foreground_layer.SetAnimationRate(20);
        room.SetForegroundLayer(foreground_layer);
        room.SetAmbient("bad_light");
         
        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room1", room);
    }
    
    this.AddObjects = function (room) {
        key = new Object("item");
        key.SetPosition(116, 280, 116 + 32, 280 + 32);
        key.SetClickSound("pickup_keys");
        key.SetImage("img/objects/key.png");
        key.SetTitle("key");
        
        obj_database.UpdateObject("key", key);
        room.AddObject(key);
        
        broken_cardreader = new Object("hitbox");
        broken_cardreader.SetPosition(167, 200, 185, 223);
        broken_cardreader.SetTitle("broken_cardreader");
        
        broken_cardreader.SetClickCallBack(function (x,y) {
            if (inventory.IsSelectedItem("hammer")) {
                sound_engine.PlaySound("break_door");

                broken_cardreader.SetValue("broken");
                door_database.UnlockDoor("jaildoor_room1");
                inventory.RemoveCurrentItem();

                background_layer = new Layer();
                background_layer.LoadImages("img/rooms/room1/room1_1bb.png");
                room.SetBackgroundLayer(background_layer);
                obj_database.UpdateObject("broken_cardreader", broken_cardreader);
            } else if (broken_cardreader.GetValue() == "broken") {
                sound_engine.PlaySound("broken_cardreader");
            } else {
                broken_cardreader.SetClickSound("bad_code");
            }
        });
        
        room.AddObject(broken_cardreader);
        obj_database.UpdateObject("broken_cardreader", broken_cardreader);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(77, 142, 161, 269);
        door1.SetDestination("Room4");
        door1.SetClickSound("slide_door");
        door1.SetTitle("jaildoor_room1");
        door1.LockDoor();
        room.AddDoor(door1);
        door_database.UpdateDoor("jaildoor_room1", door1);
       
        door2 = new Door();
        door2.SetPosition(0, 0, 42, 348);
        door2.SetDestination("Room2");
        door2.SetClickSound("walk_building");
        room.AddDoor(door2);
    }
    
    this.Init();	
}