/*
-=-=-=-=-=-=-=-=-=-=-=-=-=
A NEW SKY
---------------------------

@author: Alex Ayers
@date: 9/19/2012
@version: 1.0
-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/

function Particle() {
    this.x;
    this.y;
    this.speed_x;
    this.speed_y;
    this.decay_rate;
    this.lifetime;
}


function SmokeParticle() {
    var particle_map;
    var total_particles;
    var image = new Image();
	
    this.Create = function(total) {
        total_particles = total;
        particle_map = new Array(total_particles);
		
        image.src = "img/particles/smoke.png";
        console.log("Creating particles");
		
        for (var i = 0; i < total_particles; i++) {
            this.Refresh(i);
        }	
    }
	
    this.Refresh = function(particle_id) {
        particle_map[particle_id] = new Particle();
        particle_map[particle_id].x = Math.floor((Math.random()*350)+1); 
        particle_map[particle_id].y = 0; 
        particle_map[particle_id].speed_x = Math.random(); 
		
        if (Math.floor((Math.random()*2)+1) == 2) {
            particle_map[particle_id].speed_x *= -1;
        }
		
        particle_map[particle_id].speed_y = Math.random(); 
        particle_map[particle_id].decay_rate = Math.random(); 
        particle_map[particle_id].lifetime = Math.floor((Math.random()*10)+1);
    }
	
    this.Render = function(context) {
        for (var i = 0; i < total_particles; i++) {
            particle_map[i].x += particle_map[i].speed_x;
            particle_map[i].y += particle_map[i].speed_y;
            particle_map[i].lifetime -= particle_map[i].decay_rate;
			
            if (particle_map[i].lifeimage <= 0 ||
                particle_map[i].x >= 350 ||
                particle_map[i].x < 0 ||
                particle_map[i].y >= 350) {
                this.Refresh(i);
            }
			
            context.drawImage(image,particle_map[i].x,particle_map[i].y,32,32);
		
        }
	
    }

}

function ParticleSystem() {
    var particle_map;
    var total_particles;
    var image = new Image();
	
    this.Create = function(total) {
        total_particles = total;
        particle_map = new Array(total_particles);
		
        image.src = "img/particles/particle.png";
        console.log("Creating particles");
		
        for (var i = 0; i < total_particles; i++) {
            this.Refresh(i);
        }	
    }
	
    this.Refresh = function(particle_id) {
        particle_map[particle_id] = new Particle();
        particle_map[particle_id].x = Math.floor((Math.random()*350)+1); 
        particle_map[particle_id].y = 0; 
        particle_map[particle_id].speed_x = Math.random(); 
		
        if (Math.floor((Math.random()*2)+1) == 2) {
            particle_map[particle_id].speed_x *= -1;
        }
		
        particle_map[particle_id].speed_y = Math.random(); 
        particle_map[particle_id].decay_rate = Math.random(); 
        particle_map[particle_id].lifetime = Math.floor((Math.random()*10)+1);
    }
	
    this.Render = function(context) {
        for (var i = 0; i < total_particles; i++) {
            particle_map[i].x += particle_map[i].speed_x;
            particle_map[i].y += particle_map[i].speed_y;
            particle_map[i].lifetime -= particle_map[i].decay_rate;
			
            if (particle_map[i].lifeimage <= 0 ||
                particle_map[i].x >= 350 ||
                particle_map[i].x < 0 ||
                particle_map[i].y >= 350) {
                this.Refresh(i);
            }
			
            context.drawImage(image,particle_map[i].x,particle_map[i].y,6,6);
		
        }
	
    }



}