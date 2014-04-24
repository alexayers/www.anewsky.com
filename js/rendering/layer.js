/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Layer() {
    var animation_rate;
    var animation_tick = 0;
    var animation_map;
    var frame_idx = 0;
    var loop = true;
    var is_playing = true;
    
    this.Init = function() {
       
    }
    
    this.GetCurrentFrame = function() {
        return animation_map[frame_idx];
    }
    
    this.SetAnimationRate = function (rate) {
        animation_rate = rate;  
    }
    
    this.LoadImages = function() {
        var total = this.LoadImages.arguments.length;
        animation_map = new Array(total);
        
        for (var i = 0; i < total; i++) {
            animation_map[i] = new Image();
            animation_map[i].src = arguments[i];
        }
    }
   
    this.IsSet = function () {
        if (typeof animation_map == "undefined") {
            return false;
        } else {
            return true;
        }
    }
    
    this.NextFrame = function () {
        if (is_playing) {
            animation_tick++;
        
            if (animation_tick == animation_rate) {
                animation_tick = 0;
            
                if (frame_idx == (animation_map.length - 1)) {
                    if (loop) {
                        frame_idx = 0;
                    }
                } else {
                    frame_idx++;
                }
            }
        }
    }
    
    this.StartAnimation = function () {
        console.log("Starting animation");
        is_playing = true;
    }
    
    this.DoNotAutoPlay = function () {
        is_playing = false;
    }
    
    this.DoNotLoop = function () {
        loop = false;
    }
}