class Coin{
    constructor(x,y,velocity, rad){
        this.position = {
            x: x,
            y: y
        };

        this.width = 30;
        this.height = 35;

        this.hitBoxSize = -20;
        this.velocity = velocity;
        this.spawnTime = 2;
        this.drawed = false;
        this.image = coinImg;
        this.rad = rad;
    }
    draw(){
        c.shadowOffsetX = 5;
        c.shadowOffsetY = 5;

        c.translate(this.position.x - this.width/2, this.position.y - this.height/2)
        c.rotate(this.rad);

        this.image.draw(0, 0,
            this.width, this.height);

        c.rotate(-this.rad);
        c.translate(-this.position.x + this.width/2, -this.position.y + this.height/2)

        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
    }
    update(){
        if(this.spawnTime > 0 ){
            this.spawnTime -= 0.01;
            this.velocity.x /= 1.1
            this.velocity.y /= 1.1
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}