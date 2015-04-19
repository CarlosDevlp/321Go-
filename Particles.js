var particles = [];
var max = 60;
var GO=false;
var speed=3;
var size=20;

//The class we will use to store particles. It includes x and y
//coordinates, horizontal and vertical speed, and how long it's
//been "alive" for.
function Particle(x, y, xs, ys) {
  this.x=x;
  this.y=y;
  this.xs=xs;
  this.ys=ys;
  this.life=0;
}


function ParticleFire(X,Y,NP) {
 // NP=NP||5;
  //Adds ten new particles every frame
  for (var i=0; i<NP; i++) {
    
    //Adds a particle at the mouse position, with random horizontal and vertical speeds
    var p = new Particle(X, Y, (Math.random()*2*speed-speed)/2, 0-Math.random()*2*speed);
    particles.push(p);
  }
  
 
  for (i=0; i<particles.length; i++) {
    
    //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
    GAME.fillStyle = "rgba("+(260-(particles[i].life*2))+","+((particles[i].life*2)+50)+","+(particles[i].life*2)+","+(((max-particles[i].life)/max)*0.4)+")";
    
    GAME.beginPath();
    //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
    GAME.arc(particles[i].x,particles[i].y,(max-particles[i].life)/max*(size/2)+(size/2),0,2*Math.PI);
    GAME.fill();
    
    //Move the particle based on its horizontal and vertical speeds
    particles[i].x+=particles[i].xs;
    if(GO)
      particles[i].y-=particles[i].ys;
    else
      particles[i].y+=particles[i].ys;

    particles[i].life++;
    //If the particle has lived longer than we are allowing, remove it from the array.
    if (particles[i].life >= max) {
      particles.splice(i, 1);
      i--;
    }
  }
}

//initP();