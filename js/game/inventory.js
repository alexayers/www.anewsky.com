

/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

var inventory = new Inventory();
inventory.Init();

function Inventory() {

    var slots = new Array(8);
    var current_selected = -1;
    var x_offset = 30;
    var y_offset = 360;
    var max_inventory = 6;
    var highlight = new Image();
    var is_examining = false;
    var show_close_up = false;
    	
    this.Init = function () {
        highlight.src = "img/objects/highlight.png";
        
        for (var i = 0; i < max_inventory; i++) {
            slots[i] = 0;
        }
    }

    this.MouseClick = function(x,y,look_at) {
        this_x_offset = x_offset;
        
        if (look_at) {
            is_examining = true;
        } else {
            is_examining = false;
        }
        
        for (var i = 0; i < max_inventory; i++) {
            if (slots[i] != 0) {
                if (x >= this_x_offset && x <= (this_x_offset+32) &&
                    y >= y_offset && y <= (y_offset+32)) {
                    
                    if (current_selected == i) {
                        this.Deselect();
                    } else {
                        current_selected = i;
                    }
                    
                    sound_engine.PlaySound("inventory_click");
                    console.log("Clicking on inventory item " + slots[i].GetTitle());
                    
                    if (is_examining) {
                        show_close_up = true;
                    }
                }
            }
			
            this_x_offset += 50;
        }
    }

    this.AddItem = function (object) {
        this_x_offset = x_offset;
	
        for (var i = 0; i < max_inventory; i++) {
            if (slots[i] == 0) {
                console.log("Adding " + object.GetTitle() + " to slot " + i);
                slots[i] = object;
                slots[i].SetPosition(this_x_offset,y_offset,this_x_offset+32,y_offset+32);	
                update_inventory = true;
                return;
            }
			
            this_x_offset += 50;
        }	
		
        console.log("Failed to add any items");
    }
	
    this.Render = function (context) {
        context.fillStyle="#000000";
        context.fillRect(0,350,350,50);
        
        for (var i = 0; i < max_inventory; i++) {
            if (slots[i] != 0) { 
                
                context.drawImage(slots[i].GetInventoryImage(), slots[i].GetX(), slots[i].GetY(),32,32);
                
                if (i == current_selected) {
                    context.drawImage(highlight, slots[i].GetX(), slots[i].GetY(),32,32);
                    
                    if (show_close_up) {
                        context.fillStyle="#000000";
                        context.globalAlpha=0.6;
                        context.fillRect(0,0,350,350);
                        context.globalAlpha=1.0;
                        context.drawImage(slots[i].GetExamineImage(), 50, 50,250,250);
                        
                        context.fillStyle = "white";
                        context.textAlign="center"; 
                        context.font = "bold 20px Terminal";
                        
                        if (slots[i].GetFriendlyTitle() != "" ) {
                            context.fillText(slots[i].GetFriendlyTitle(), 175, 320);
                        } else {
                            context.fillText(slots[i].GetTitle(), 175, 320);
                        }
                    }
                }
            }
        }
    }
    
    this.RemoveCurrentItem = function () {
        this.RemoveItem(this.GetCurrentSelectedIdx());
    }
	
    this.GetCurrentItemImage = function () {
        return slots[current_selected].GetImage();
    }
	
    this.RemoveItem = function (idx) {
        console.log("Removing " + idx);
        slots[idx] = 0;
        current_selected = -1;
    }
    
    this.Deselect = function (){
        current_selected = -1;
    }
	
    this.ExamineItem = function (idx) {
        console.log("You are looking at " + slots[idx].GetTitle());
    }
		
    this.GetSelectedObjId = function () {
        if (current_selected != -1) {
            return obj_database.GetObjectId(slots[current_selected].GetTitle());
        } else {
            return -1;
        }
    }
    
    this.GetCurrentSelectedIdx = function () {
        return current_selected;
    }
    
    this.StopExamining = function () {
        show_close_up = false;
    }
    
    this.IsSelectedItem = function(name) {
        if (inventory.GetSelectedObjId() == obj_database.GetObjectId(name)) {
            return true;
        } else {
            return false;
        }
    }
    
    this.IsExamining = function () {
        return is_examining;
    }
}
