const friction = 0.9;

class Particle{
    constructor(x,y,radius,color,velocity, vanishing){
        this.position = {
            x: x,
            y: y
        };
        this.updatePosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.radius = radius
        this.hitBoxSize = -20;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.drawed = false;
        this.vanishing = vanishing;
    }
    draw(){
        c.shadowOffsetX = 5;
        c.shadowOffsetY = 5;

        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.updatePosition.x, this.updatePosition.y, this.radius, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
    }
    update(){
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.updatePosition.x += this.velocity.x;
        this.updatePosition.y += this.velocity.y;
        this.alpha -= this.vanishing;
    }
}