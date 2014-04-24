/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

var debug = true;
var mouse_position;

window.onload = function() {	
    var canvas = document.getElementById("Viewport");
    
    scene.Init();

    canvas.addEventListener('mousemove', function(evt) {
        var canvas = document.getElementById("Viewport");
        mouse_position = GetMouseCoord(canvas, evt);		
		
        if (scene.MouseOver(mouse_position.x,mouse_position.y)) {
            $("canvas").css("cursor","pointer");
        } else {
            $("canvas").css("cursor","default");
        }
    }, false);
    	
    canvas.addEventListener('mousedown', function(evt) {
        mouse_position = GetMouseCoord(canvas, evt);
        scene.MouseClick(mouse_position.x,mouse_position.y);
        
        if (evt.which == 1) {
            inventory.MouseClick(mouse_position.x,mouse_position.y, false);
        } else if (evt.which == 3){
            inventory.MouseClick(mouse_position.x,mouse_position.y, true);
        }
    }, false);
    
    canvas.addEventListener('contextmenu', function(evt) {
        evt.preventDefault(); 
        mouse_position = GetMouseCoord(canvas, evt);
        inventory.MouseClick(mouse_position.x,mouse_position.y, true);
    }, false);
	
    RenderLoop();
};

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
	  
function RenderLoop() {
    var canvas = document.getElementById("Viewport");
    var context = canvas.getContext("2d");
    
    // Don't use bicubic resize algortihm.
    
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.patternQuality = 'fast';
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    scene.Render(context);
    inventory.Render(context);

    requestAnimFrame(function() {
        RenderLoop();
    });
}

function GetMouseCoord(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
	
    // return relative mouse position
    var mouseX = evt.clientX - rect.top - root.scrollTop;
    var mouseY = evt.clientY - rect.left - root.scrollLeft;
	
    return {
        x: mouseX,
        y: mouseY
    };
}