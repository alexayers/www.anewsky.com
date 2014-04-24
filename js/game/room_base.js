/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Room() {
    var background = new Layer();
    var middleground = new Layer();
    var foreground = new Layer();
    
    var ambience = "";
    var object_map = new Array();
    var door_map = new Array();
    var object_idx = 0;
    var door_idx = 0;
    var one_time_callback = ""; // If transitioning to room triggers a special event
	
    this.Init = function() {
    // empty.
    }
    
    this.SetOneTimeCallBack = function (func) {
        one_time_callback = func;
    }
    
    this.Render = function(context) {
                
        if (background.IsSet()) {
            context.drawImage(background.GetCurrentFrame(),0,0,350,350);
            background.NextFrame();
        }
        
        if (middleground.IsSet()) {
            context.drawImage(middleground.GetCurrentFrame(),0,0,350,350);
            middleground.NextFrame();
        }
        
        for (var i = 0; i < object_idx; i++) {
            object_map[i].Render(context);
        }
        
        if (foreground.IsSet() != "") {
            context.drawImage(foreground.GetCurrentFrame(),0,0,350,350);
            foreground.NextFrame();
        }
        
        this.OneTimeCallBack();
   }
	
    this.SetTitle = function(my_title) {
        title = my_title;
    }
	
    this.SetBackgroundLayer = function(layer) {        
        background = layer;
    }
	
    this.SetMiddlegroundLayer = function(layer) {
        middleground = layer;
    }
    
    this.SetForegroundLayer = function(layer) {
        foreground = layer;
    }
    
    this.PlayBackgroundLayer = function () {
        background.StartAnimation();
    }
    
    this.PlayMiddlegroundLayer = function () {
        middleground.StartAnimation();
    }
    
    this.PlayForegroundLayer = function () {
        foreground.StartAnimation();
    }
    
    this.SetAmbient = function(snd_file) {
        sound_engine.Set(snd_file);
        ambience = snd_file;
    }
	
    this.GetAmbience = function() {
        return ambience;
    }
	
    this.AddObject = function(object) {
        console.log("Adding object " + object.GetTitle() + " idx = " + object_idx);
        object_map[object_idx] = object;
        object_idx++;
    }
	
    this.AddDoor = function (door) {
        door_map[door_idx] = door;
        door_idx++;
    }
		
    this.ProcessMouseOver = function(x,y) {
        total = object_map.length;
        var is_over_something = false;
        
        if (inventory.IsExamining()) {
            return true;
        }

        for (var i = 0; i < total; i++) {
            if (object_map[i].IsOnScreen()) {
                if (x >= object_map[i].GetX() && x <= (object_map[i].GetX() + object_map[i].GetWidth()) &&
                    y >= object_map[i].GetY() && y <= (object_map[i].GetY() + object_map[i].GetHeight())) {
                    is_over_something = true;
                }
            }
        }
		
        total = door_map.length;
		
        for (i = 0; i < total; i++) {
            if (x >= door_map[i].GetX() && x <= (door_map[i].GetX() + door_map[i].GetWidth()) &&
                y >= door_map[i].GetY() && y <= (door_map[i].GetY() + door_map[i].GetHeight())) {
                is_over_something = true;
            }
        }
		
        return is_over_something;
    }
	
    this.ProcessMouseClick = function(x,y) {
        total = object_map.length;
        
        if (inventory.IsExamining()) {
            inventory.StopExamining();
            return;
        }

        for (var i = 0; i < total; i++) {
            if (object_map[i].IsOnScreen()) {
                if (x >= object_map[i].GetX() && x <= (object_map[i].GetX() + object_map[i].GetWidth()) &&
                    y >= object_map[i].GetY() && y <= (object_map[i].GetY() + object_map[i].GetHeight())) {
                    console.log("You clicked on " + object_map[i].GetTitle());
                    return object_map[i].ProcessClick(x,y);
                }
            }	
        }
		
        total = door_map.length;
		
        for (i = 0; i < total; i++) {
            if (x >= door_map[i].GetX() && x <= (door_map[i].GetX() + door_map[i].GetWidth()) &&
                y >= door_map[i].GetY() && y <= (door_map[i].GetY() + door_map[i].GetHeight())) {
                console.log("You clicked on " + door_map[i].GetTitle());
                return door_map[i].ProcessClick();
            }
        }
		
        return "";
    }
    
    this.OneTimeCallBack = function () {
        if (one_time_callback != "") {
            one_time_callback();
            one_time_callback = "";
        }
    }
}