/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room9() {
    
    this.Init = function() {
        room = new Room();

        background_layer = new Layer();
        background_layer.LoadImages(
            "img/rooms/room9/room9_1b.png",
            "img/rooms/room9/room9_2b.png",
            "img/rooms/room9/room9_3b.png"
            );
       
        background_layer.SetAnimationRate(50);
        room.SetBackgroundLayer(background_layer);

        middleground_layer = new Layer();
        middleground_layer.LoadImages("img/rooms/room9/room9_1m.png");
        room.SetMiddlegroundLayer(middleground_layer);
        
        room.SetAmbient("wind");

        this.AddObjects(room);
        this.AddDoors(room);

        scene.AddBackground("Room9", room);
    }
    
    this.AddObjects = function (room) {        
        pilar2 = new Object("hitbox");
        pilar2.SetPosition(132, 131, 184, 177);
        pilar2.SetClickSound("rocks");
        pilar2.SetTitle("pilar2");
        pilar2.SetValue("");

        
        pilar2.SetClickCallBack( function (x,y) { 
            if (inventory.IsSelectedItem("purple_crystal")) {
                pilar2.SetValue("true");
                pilar3 = obj_database.GetObject("pilar3");
   
                if (pilar3.GetValue() == "true") {
                    middleground_layer = new Layer();
                    middleground_layer.LoadImages(
                        "img/rooms/room9/room9_1m_all.png",
                        "img/rooms/room9/room9_2m_all.png",
                        "img/rooms/room9/room9_3m_all.png"
                        );
                    
                    middleground_layer.SetAnimationRate(30);
                    room.SetMiddlegroundLayer(middleground_layer);
                    
                    room30 = scene.GetRoom("Room30");
                    background_layer = new Layer();
                    background_layer.LoadImages(
                        "img/rooms/room30/room30_1bb.png",
                        "img/rooms/room30/room30_1bc.png"
                        );
                            
                    background_layer.SetAnimationRate(30);
                    
                    room30.SetBackgroundLayer(background_layer);
                    scene.UpdateRoom("Room30", room30);
                } else {
                    middleground_layer = new Layer();
                    middleground_layer.LoadImages("img/rooms/room9/room9_1m_purple.png");
                    room.SetMiddlegroundLayer(middleground_layer);
                }
                
                obj_database.UpdateObject("pilar2", pilar2);
                inventory.RemoveCurrentItem();
            }
        });
        
        obj_database.UpdateObject("pilar2", pilar2);
        room.AddObject(pilar2);
        
        pilar3 = new Object("hitbox");
        pilar3.SetPosition(197, 65, 247, 140);
        
        pilar3.SetClickSound("rocks");
        pilar3.SetTitle("pilar3");
        pilar3.SetValue("");
        
        pilar3.SetClickCallBack( function (x,y) {        
            if (inventory.IsSelectedItem("pink_crystal")) {
                pilar3.SetValue("true");
                pilar2 = obj_database.GetObject("pilar2");

                if (pilar2.GetValue() == "true") {
                    middleground_layer = new Layer();
                    middleground_layer.LoadImages(
                        "img/rooms/room9/room9_1m_all.png",
                        "img/rooms/room9/room9_2m_all.png",
                        "img/rooms/room9/room9_3m_all.png"
                        );
                    
                    middleground_layer.SetAnimationRate(30);
                    
                    room.SetMiddlegroundLayer(middleground_layer);
                    
                    room30 = scene.GetRoom("Room30");
                    background_layer = new Layer();
                    background_layer.LoadImages(
                        "img/rooms/room30/room30_1bb.png",
                        "img/rooms/room30/room30_1bc.png"
                        );
                    
                    background_layer.SetAnimationRate(30);

                    room30.SetBackgroundLayer(background_layer);
                    scene.UpdateRoom("Room30", room30);
                } else {
                    middleground_layer = new Layer();
                    middleground_layer.LoadImages("img/rooms/room9/room9_1m_pink.png");
                    room.SetMiddlegroundLayer(middleground_layer);
                }
                
                obj_database.UpdateObject("pilar3", pilar3);
                inventory.RemoveCurrentItem();
            }
        });
        
        obj_database.UpdateObject("pilar3", pilar3);
        room.AddObject(pilar3);
    }
    
    this.AddDoors = function (room) {
        door1 = new Door();
        door1.SetPosition(0, 0, 63, 350);
        door1.SetDestination("Room8");
        door1.SetClickSound("walk_sand");
        room.AddDoor(door1);
       
        door2 = new Door();
        door2.SetPosition(281, 0, 350, 350);
        door2.SetDestination("Room10");
        door2.SetClickSound("walk_sand");
        room.AddDoor(door2);
    }
    
    this.Init();
}