/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Door() {
    var x;
    var y;
    var width;
    var height;
    var title;
    var next_scene;
    var click_sound = "";
    var is_locked = false;
    var the_key;

    this.Init = function() {
    }
	
    this.ProcessClick = function() {
        
        if (is_locked && inventory.GetSelectedObjId() == the_key) {
            click_sound = "unlock_door";
            is_locked = false;
            sound_engine.PlaySound(click_sound);
            inventory.RemoveItem(inventory.GetCurrentSelectedIdx());
        } else {
            if (click_sound != "") {
                sound_engine.PlaySound(click_sound);
            }
        }
	
        if (!is_locked) {
            inventory.Deselect();
            scene.SetScene(next_scene);
        }
    }
	
    this.SetTitle = function (str) {
        title = str;
    }
	
    this.SetPosition = function (t_x,t_y,b_x,b_y) {
        x = t_x;
        y = t_y;
        this.SetDimensions(b_x - t_x,b_y - t_y);
    }
	
    this.SetDimensions = function (w,h) {
        height = h;
        width = w;
    }

    this.SetDestination = function (destination_scene) {
        console.log("The " + title + " will take you to scene " + destination_scene);
        next_scene = scene.GetSceneIdx(destination_scene);
    }
	
    this.SetClickSound = function (snd_file) {
        click_sound = snd_file;
    }
    
    this.SetKey = function (name) {
        the_key = obj_database.GetObjectId(name);
    }
    
    this.LockDoor = function () {
        is_locked = true;
    }
    
    this.UnlockDoor = function () {
        is_locked = false;
    }
	
    this.GetTitle = function() {
        return title;
    }	

    this.GetX = function() {
        return x;
    }
	
    this.GetY = function() {
        return y;
    }
	
    this.GetHeight = function() {
        return height;
    }
	
    this.GetWidth = function() {
        return width;
    }
}