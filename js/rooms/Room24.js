/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room24() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages("img/rooms/room24/room24_1b.png");
        room.SetBackgroundLayer(background_layer);
        room.SetAmbient("cave");

        this.AddObjects(room);
        this.AddDoors(room);
        

        scene.AddBackground("Room24", room);
    }
    
    this.AddObjects = function (room) {
        cave_computer = new Object("hitbox");
        cave_computer.SetPosition(134, 89, 234, 168);
        cave_computer.SetTitle("cave_computer");
        cave_computer.SetClickCallBack(function (x,y) {
            generator = obj_database.GetObject("generator");
            power = generator.GetValue();
            
            if (power == "powered") {
                sound_engine.PlaySound("walk_computer");
                scene.SetScene(32);
            }
        });
        
        room.AddObject(cave_computer);
        obj_database.UpdateObject("cave_computer", cave_computer);
    }
    
    this.AddDoors = function (room) {
       door1 = new Door();
       door1.SetPosition(315, 0, 350, 350);
       door1.SetDestination("Room15");
       door1.SetClickSound("walk_sand");
       room.AddDoor(door1);
    }
    
    this.Init();	
}