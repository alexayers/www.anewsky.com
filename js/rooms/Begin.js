/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Begin() {
    
    this.Init = function() {
        room = new Room();
        
        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/begin/begin1.png",
            "img/rooms/begin/begin2.png",
            "img/rooms/begin/begin3.png"
            );
        
        background_layer.SetAnimationRate(20);
        room.SetBackgroundLayer(background_layer);

        room.SetAmbient("begin");
        this.AddDoors(room);
        
        scene.AddBackground("Begin", room);
    }
    
    this.AddDoors = function (room) {
        door = new Door();
        door.SetPosition(0, 0, 350, 350);
        door.SetDestination("Room0");
        room.AddDoor(door);
    }
    
    this.Init();
}