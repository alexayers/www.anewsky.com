/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

var obj_database = new ObjDatabase();
var door_database = new DoorDatabase()

function ObjDatabase() {
    var obj_id_list = new Array();
    var obj_list = new Array();
    var obj_idx = 1;
    
    this.Init = function () {
        this.RegisterObject("keycard");
        this.RegisterObject("key");
        this.RegisterObject("hammer");
        this.RegisterObject("toolbox");
        this.RegisterObject("purple_crystal");
        this.RegisterObject("pink_crystal");
        this.RegisterObject("blue_crystal");
        this.RegisterObject("storage_device");
        this.RegisterObject("parachute");
        this.RegisterObject("photo");
        this.RegisterObject("cardreader");
        this.RegisterObject("broken_cardreader");
        this.RegisterObject("keypad");
        this.RegisterObject("keypad_enter");
        this.RegisterObject("power_cell");
        this.RegisterObject("trunk");
        this.RegisterObject("generator");
        this.RegisterObject("mappad");
        this.RegisterObject("mappad_enter");
        this.RegisterObject("glassdoor");
        this.RegisterObject("shovel");
        this.RegisterObject("wall_shovel");
        this.RegisterObject("grave");
        this.RegisterObject("release_storage");
        this.RegisterObject("empty_storage");
        this.RegisterObject("cave_computer");
        this.RegisterObject("mapload_enter");
        
        this.RegisterObject("nav_storage");
        this.RegisterObject("nav_enter");

    }
    
    this.RegisterObject = function (name) {
        obj_id_list[name] = obj_idx;
        
        obj_idx++;
    }
    
    this.UpdateObject = function (name, object) {
        obj_list[name] = object;
    }
     
    this.GetObject = function (name) {
        return obj_list[name];
    }
  
    this.GetObjectId = function (name) {
        return obj_id_list[name];
    }
}

function DoorDatabase() {
    var door_list = new Array();
 
    
    this.Init = function () {
        this.RegisterDoor("mapdoor_room5");
        this.RegisterDoor("jaildoor_room1");
        this.RegisterDoor("energydoor_room22");
        this.RegisterDoor("energydoor_room12");
    }
    
    this.RegisterDoor = function (name) {
        door_list[name] = "";
    }
    
    this.UpdateDoor = function (name, door) {
        door_list[name] = door;
    }
    
    this.LockDoor = function (name) {
        door_list[name].LockDoor();
    }
    
    this.UnlockDoor = function (name) {
        door_list[name].UnlockDoor();
    }
    
    this.GetDoor = function (name) {
        return door_list[name];
    }  
}
