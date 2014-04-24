/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room29() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room29/room29_1b.png");

        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages("img/rooms/room29/room29_1m.png");

        room.SetMiddlegroundLayer(middleground_layer);
        
        room.SetAmbient("spaceship");

        this.AddObjects(room);
        this.AddDoors(room);
        
        scene.AddBackground("Room29", room);
    }
    
    this.AddObjects = function (room) {
        trunk = new Object("hitbox");
        trunk.SetClickSound("remove_power");
        trunk.SetPosition(46, 140, 331, 314);
        trunk.SetTitle("trunk");
        trunk.SetClickCallBack(function (x,y) {
            middleground_layer = new Layer();
            middleground_layer.LoadImages("img/objects/nothing.png");
            middleground_layer.SetAnimationRate(70);
            room.SetMiddlegroundLayer(middleground_layer);
            
            power_cell = new Object("item");
            power_cell.SetTitle("power_cell");
            power_cell.SetFriendlyTitle("power cell");
            power_cell.SetImage("img/objects/power_cell.png");
            obj_database.UpdateObject("power_cell", power_cell);
            inventory.AddItem(power_cell);
            
            trunk.Destroy();
        });
        
        obj_database.UpdateObject("trunk", trunk);
        room.AddObject(trunk);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 337, 121);
        door1.SetDestination("Room12");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
    }
    
    this.Init();		
}