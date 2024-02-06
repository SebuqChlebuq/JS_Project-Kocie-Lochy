class Bullet{
    constructor(x, y, velocity, speed, bulletImg){
        this.position = {
            x: x,
            y: y
        };
        this.velocity = velocity; //x, y
        this.speed = speed;
        this.drawed = false;
        this.hitBoxSize = 20
        this.image = bulletImg;
    }
    
    draw(){
        this.image.draw(this.position.x - this.hitBoxSize/2, this.position.y - this.hitBoxSize/2,
            this.hitBoxSize, this.hitBoxSize);
        // c.beginPath();
        // c.fillStyle = 'red';
        // c.arc(this.position.x, this.position.y, this.hitBoxSize, 0, Math.PI*2, false);
        // c.fill();
        // c.closePath();
    }

    update(){
        this.position.x += this.velocity.x * this.speed;
        this.position.y += this.velocity.y * this.speed;
    }
};