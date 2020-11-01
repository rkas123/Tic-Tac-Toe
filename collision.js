const canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext("2d");
c.lineWidth=2;
const colors=[
    "#2185C5","#7ECEFD","#FF7F66"
];
var mouse={
    x: undefined,
    y: undefined
}
function distance(x1,y1,x2,y2)
{
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

window.addEventListener("resize",function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    c.lineWidth=2;
    init();
})
window.addEventListener("mousemove",function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})
function controlCollision(x1,y1,v1,x2,y2,v2)
{
    var xvdiff= v1.x-v2.x;
    var yvdiff= v1.y-v2.y;
    var xdiff=x2-x1;
    var ydiff=y2-y1;
    if(xvdiff*xdiff + yvdiff*ydiff >= 0){
        const angle=Math.atan((y1-y2)/(x1-x2));
        var vel1={
            y: v1.y*Math.cos(angle) - v1.x*Math.sin(angle),
            x: v1.y*Math.sin(angle) + v1.x*Math.cos(angle)
        }
        var vel2={
            y: v2.y*Math.cos(angle) - v2.x*Math.sin(angle),
            x: v2.y*Math.sin(angle) + v2.x*Math.cos(angle)
        }
        var temp=vel1.x;
        vel1.x=vel2.x;
        vel2.x=temp;

        v1.y=(vel1.y*Math.cos(angle) + vel1.x*Math.sin(angle));
        v1.x=(vel1.x*Math.cos(angle) - vel1.y*Math.sin(angle));

        v2.y=(vel2.y*Math.cos(angle) + vel2.x*Math.sin(angle));
        v2.x=(vel2.x*Math.cos(angle) - vel2.y*Math.sin(angle));
    }
    
}

function Particle(x,y,radius,color)
{
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=colors[Math.floor(Math.random()*colors.length)];
    this.velocity={
        x: Math.floor(Math.random()*2) -1,
        y: Math.floor(Math.random()*2) -1
    }
    this.opacity=0;
    this.draw = function()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI *2, false);
        c.save();
        c.globalAlpha=this.opacity;
        c.fillStyle=this.color;
        c.fill();
        c.restore();
        c.strokeStyle=this.color;
        c.stroke();
        c.closePath();
    }
    this.update = function(particles)
    {
        this.draw();
        for(let i=0;i<particles.length;i++)
        {
            if(this === particles[i])
                continue;
            if(distance(this.x,this.y,particles[i].x,particles[i].y) - (particles[i].radius + this.radius) <= 0){
                controlCollision(this.x,this.y,this.velocity,particles[i].x,particles[i].y,particles[i].velocity);
            }
        }
        if(this.x  + this.radius >= window.innerWidth || this.x -this.radius <= 0)
        {
            this.velocity.x *= (-1);
        }
        if(this.y + this.radius >= window.innerHeight || this.y - this.radius <=0){
            this.velocity.y*=(-1);
        }
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;

        //mouse event
        if(distance(this.x,this.y,mouse.x,mouse.y) < 120 && this.opacity <0.5)
        {
            this.opacity+=0.02;
        }
        else if(this.opacity >0){
            this.opacity-=0.02;
            this.opacity=Math.max(this.opacity,0);
        }
    }
}
var particles=[];
function init()
{
    particles=[];
    for(let i=0;i<150;i++)
    {
        let radius =15;
        let x=Math.floor(Math.random()* (innerWidth - 2*radius))+ radius;
        let y=Math.floor(Math.random()* (innerHeight - 2*radius)) + radius;
        
        let color="blue";

        if(i !== 0)
        {
            for(let j=0;j<particles.length;j++)
            {
                if(distance(x,y,particles[j].x,particles[j].y) < radius + particles[j].radius){
                    x=Math.floor(Math.random()* (innerWidth - 2*radius))+ radius;
                    y=Math.floor(Math.random()* (innerHeight - 2*radius)) + radius;
                    j=-1;
                }
            }
        }
        particles.push(new Particle(x,y,radius,color));
    }
}


function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    particles.forEach(function(particle){
        particle.update(particles);
    })
}

init();
animate();