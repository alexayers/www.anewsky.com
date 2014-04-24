/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room5() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room5/room5_1b.png",
            "img/rooms/room5/room5_2b.png",
            "img/rooms/room5/room5_3b.png"
            );
                
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages(
            "img/rooms/room5/room5_1m.png",
            "img/rooms/room5/room5_2m.png"
            );
        
        middleground_layer.SetAnimationRate(70);
        room.SetMiddlegroundLayer(middleground_layer);
        room.SetAmbient("wind");

        this.AddObjects(room);
        this.AddDoors(room);
        
        scene.AddBackground("Room5", room);
    }
    
    this.AddObjects = function (room) {
        cardreader = new Object("hitbox");
        cardreader.SetClickSound("slide_door");
        cardreader.SetPosition(270, 183, 302, 230);
        cardreader.SetTitle("cardreader");
        
        cardreader.SetClickCallBack(function (x,y) {
            if (inventory.IsSelectedItem("keycard")) {
                console.log("Trying to unlock door.");
                door_database.UnlockDoor("mapdoor_room5");
                
                middleground_layer = new Layer();
                middleground_layer.LoadImages(
                    "img/rooms/room5/room5_1mb.png",
                    "img/rooms/room5/room5_2mb.png"
                    );
                middleground_layer.SetAnimationRate(70);
                room.SetMiddlegroundLayer(middleground_layer);
                inventory.RemoveCurrentItem();
            }
        });
        
        obj_database.UpdateObject("cardreader", cardreader);
        room.AddObject(cardreader);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(154, 131, 247, 267);
        door1.SetDestination("Room18");
        door1.SetClickSound("slide_door");
        door1.SetTitle("mapdoor_room5");
        door1.LockDoor();
        
        door_database.UpdateDoor("mapdoor_room5", door1);
        room.AddDoor(door1);

        door2 = new Door();
        door2.SetPosition(306, 0, 350, 350);
        door2.SetDestination("Room4");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);

    }
    
    this.Init();	
}