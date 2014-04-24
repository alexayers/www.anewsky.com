/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

var scene = new SceneMgr();

function SceneMgr() {
    var scene_map = new Array();
    var scene_name_map = new Array();
    var current_scene = 0;
    var scene_idx = 0;
    var is_new_scene = true;

    this.Init = function() {	
        var total_rooms = 34;
        
        scene_name_map["Room0"] = 0;
        scene_name_map["Begin"] = -1;
   
        obj_database.Init();
        door_database.Init(); 
       
        for (var i = 1; i <= total_rooms; i++) {
            this.NewScene("Room" + i);
        }
        
        for (title in scene_name_map) {
            console.log("Initializing..." + title);
            window[title]();
        }
        
        this.SetScene(-1);
    }

    this.AddBackground = function(title,room) {
        scene_map[this.GetSceneIdx(title)] = room;
        scene_map[this.GetSceneIdx(title)].title = title;
    }

    this.Render = function(context) {
        scene_map[current_scene].Render(context);
        
    }
	
    this.GetCurrentScene = function() {
        return current_scene;
    }
	
    this.GetSceneIdx = function(scene_name) {
        return scene_name_map[scene_name];
    }
	
    this.NewScene = function(scene_name) {
        scene_idx++; // We are reserving scene_idx = 0 for our title screen.
        scene_name_map[scene_name] = scene_idx;
        return scene_idx;
    }

    this.GetCurrentSceneName = function() {
        return scene_map[current_scene].title;
    }
	
    this.MouseOver = function(x,y) {
        return scene_map[current_scene].ProcessMouseOver(x,y);
    }
	
    this.MouseClick = function(x,y) {
        scene_map[current_scene].ProcessMouseClick(x,y);
    }
	
    this.SetScene = function(new_scene) {
        console.log("Changing to a new scene " + new_scene);
        current_scene = new_scene;
        $("canvas").css("cursor","default"); // If this isn't done the cursor will stay a hand until mouse is moved.
        is_new_scene = true;
        
        if (sound_engine.GetCurrentSound() != scene_map[current_scene].GetAmbience()) {
            console.log("Current Ambient sound " + sound_engine.GetCurrentSound("ambient") + " isn't the new one " + scene_map[current_scene].GetAmbience() + ", so change sound.");
            sound_engine.Stop("ambient");
            sound_engine.Set(scene_map[current_scene].GetAmbience());
            sound_engine.PlayLooped(scene_map[current_scene].GetAmbience());
        }
        
        $("#subtitle").css("display","none");
        $("#maintitle").css("display","none");
        
        scene_map[current_scene].Get
    }
	
    this.IsNewScene = function() {
        if (is_new_scene) { 
            is_new_scene = false;
            return true;
        } else {
            return false;
        }
    }

    this.GetBackgroundImage = function() {
        return scene_map[current_scene].GetImage();
    }
    
    this.GetRoom = function (name) {
        return scene_map[scene_name_map[name]];
    }
    
    this.UpdateRoom = function (name,room) {
        scene_map[scene_name_map[name]] = room;
    }
}