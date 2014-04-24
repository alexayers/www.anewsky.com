/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */

function Object(object_type) {
    var x = "";
    var y = "";
    var height = "";
    var width = "";
    var title = "";
    var friendly_title = "";
    var click_sound = "";
    var value = "";
    var image = new Image();
    var image_inventory = new Image();
    var type = "";
    var image_examine = new Image();
        
    var is_grabbable = false;
    var is_on_screen = false;
    var is_clickable = false;
    var can_examine = false;
    
    var click_callback = "";
    var render_callback = "";
	
    this.Init = function(object_type) {
        if (object_type == "item") {
            can_examine = true;
            is_grabbable = true;
            
        } else if (object_type == "hitbox") {
            image.src = "img/objects/nothing.png";
            is_clickable = true;
        } else if (object_type == "itembox") {
            image.src = "img/objects/nothing.png";    
            is_grabbable = true;
            is_clickable = true;
            can_examine = true;
        }
        
        type = object_type;
        is_on_screen = true;
    }
	
    this.Render = function(context) {
        if (render_callback != "") {
            render_callback();
        } else if (image.src != "" && is_on_screen) {
            context.drawImage(image,x,y,height,width);
        }
    }
	
    this.SetTitle = function(mystr) {
        title = mystr;
    }
    
    this.SetFriendlyTitle = function(mystr) {
        friendly_title = mystr;
    }
    
    this.SetRenderCallBack = function (func) {
        render_callback = func;
    }
		
    this.SetPosition = function (t_x,t_y,b_x,b_y) {
        x = t_x;
        y = t_y;
        this.SetDimensions(b_x - t_x,b_y - t_y);
    }
    
    this.SetValue = function (str) {
        value = str;
    }
	
    this.SetDimensions = function (w,h) {
        height = h;
        width = w;
    }
    
    this.YouCanSee = function () {
        is_on_screen = true;
    }
    
    this.YouCanExamine = function () {
        can_examine = true;
    }
	
    this.YouCanPickUp = function () {
        is_grabbable = true;
    }
    
    this.YouCanClick = function () {
        is_clickable = true;
    }
    
    this.YouCantClick = function () {
        is_clickable = false;
    }
    
    this.SetImage = function (png_file) {
        
        if (type == "item") { 
            image.src = png_file;
        }
        
        image_inventory.src = png_file;
        image_examine.src = png_file;
    }
	
    this.SetInactiveImage = function (png_file) {
        image.src = png_file;
    }
    
    this.SetInventoryImage = function (png_file) {
        image_inventory.src = png_file;
    }
    
    this.SetExamineImage = function (png_file) {
        image_examine.src = png_file;
    }
	
    this.GetImage = function() {
        return image;
    }
    
    this.GetInventoryImage = function() {
        return image_inventory;
    }
    
    this.GetExamineImage = function () {
        return image_examine;
    }
	
    this.SetClickSound = function (ogg_file) {
        click_sound = ogg_file;
    }
    
    this.SetClickCallBack = function (func) {
        click_callback = func;
    }
	
    this.ProcessClick = function(x,y) {
        if (click_sound != "") {
            sound_engine.PlaySound(click_sound);
           // PlaySound(click_sound);
        }

        if (is_grabbable) {
            inventory.AddItem(this);
            is_on_screen = false;
            is_grabbable = false;
            
            if (click_callback != "") {
                click_callback(x,y);
            }
        }
        
        if (is_clickable) {
            if (click_callback != "") {
                click_callback(x,y);
            }
        }
    }
    
    this.IsExaminable = function () {
        return can_examine;
    }
	
    this.IsOnScreen = function () {
        return is_on_screen;
    }
	
    this.GetImage = function () {
        return image;
    }

    this.GetImageSrc = function () {
        return image.src;
    }	
	
    this.GetX = function() {
        return x;
    }
    
    this.GetValue = function () {
        return value;
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
	
    this.GetTitle = function(){
        return title;
    }
    
    this.GetFriendlyTitle = function () {
        return friendly_title;
    }
    
    this.Destroy = function () {
        click_sound = "";
        is_on_screen = false;
        is_clickable = false;
    }
   
    this.Init(object_type);  
}

 