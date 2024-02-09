class Player{
    constructor(){
        this.position = {
            x: 600,
            y: 400
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rad = 0;
        this.width = 90;
        this.height = 90;
        this.idleY = 0;
        this.idleSwitch = true;
        this.idleAcceleration = 0.001;
        this.gunPosition = {
            x: 0,
            y: 10
        }
        this.gunSize = {
            width: 90,
            height: 32
        }
        this.pushVelocity = {
            x: 0,
            y: 0
        }
        this.weaponPushVelocity = {
            x: 0,
            y: 0
        }
        this.setShootDelay = 10;
        this.shootDelay = 0;

        this.hitBoxSize = this.height/2 -5
        this.drawed = false;
        this.onTile = undefined;
        this.bodyImg = new Sprite("Img/Character/Body.png");
        this.weaponImg = new Sprite("Img/Character/Weapon.png");
        this.healthMax = 3;
        this.health = this.healthMax;
    }
    shoot(){
        if(this.shootDelay < 1){
            this.shootDelay = this.setShootDelay
            for(let i = 0; i<5;i++){
                let velocity = {
                    x: Math.cos(this.rad + (Math.random()- 0.5)/2),
                    y: Math.sin(this.rad + (Math.random() - 0.5)/2)
                }
                let speed = 20 + Math.random()*5;
                let x = this.position.x + this.gunPosition.x + velocity.x * this.gunSize.width/2;
                let y = this.position.y + this.gunPosition.y + velocity.y * this.gunSize.width/2 - 10; 
                bullets.push(new Bullet(x, y, velocity, speed, playerBulletImg, "player"));
                
                this.pushVelocity.x = -velocity.x * 20;
                this.pushVelocity.y = -velocity.y * 20;
                
                this.weaponPushVelocity.x = -velocity.x * 30;
                this.weaponPushVelocity.y = -velocity.y * 30;
            }
        }
    }

    draw(){
        c.shadowOffsetX = 5;
        c.shadowOffsetY = 5;
        //set center point
        c.translate(this.position.x, this.position.y);
        
        if(mouse.x >= player.position.x){//prawo
            c.rotate(this.rad/16);

            c.scale(-1,1);
            this.bodyImg.draw(-this.width/2,-this.height/2 - this.idleY,
            this.width, this.height);
            c.scale(-1,1);
            c.translate(this.gunPosition.x,this.gunPosition.y)
            c.rotate(this.rad/16*15);

            
            c.scale(-1,1);
            this.weaponImg.draw(-this.gunSize.width/2 -10 - this.weaponPushVelocity.x ,-this.gunSize.height/2 - this.weaponPushVelocity.y,
                this.gunSize.width,this.gunSize.height);
            c.scale(-1,1);
            c.rotate(-this.rad/16*15);
            c.translate(-this.gunPosition.x,-this.gunPosition.y)
            c.rotate(-this.rad/16);
        }else{//lewo
            if((this.rad)/16 < 0) c.rotate((this.rad + Math.PI)/16);
            else c.rotate((this.rad - Math.PI)/16);
            

            this.bodyImg.draw(-this.width/2,-this.height/2 - this.idleY,
            this.width, this.height);
            c.translate(this.gunPosition.x,this.gunPosition.y)

            if((this.rad)/16 < 0) c.rotate((this.rad + Math.PI)/16*15);
            else c.rotate((this.rad - Math.PI)/16*15);

            this.weaponImg.draw(-this.gunSize.width/2 -10 + this.weaponPushVelocity.x ,-this.gunSize.height/2 + this.weaponPushVelocity.y,
                this.gunSize.width,this.gunSize.height);
            if((this.rad)/16 < 0) c.rotate(-(this.rad + Math.PI)/16*15);
            else c.rotate(-(this.rad - Math.PI)/16*15);

            c.translate(-this.gunPosition.x,-this.gunPosition.y)
            if((this.rad)/16 < 0) c.rotate(-(this.rad + Math.PI)/16);
            else c.rotate(-(this.rad - Math.PI)/16);
        }


        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        //draw hitbox area
        c.beginPath();
        c.lineWidth = 1.2;
        c.strokeStyle = "rgb(255,255,255,0.2)";
        c.arc(0, 0, this.hitBoxSize ,0,Math.PI*2, false)
        c.stroke();
        c.closePath();

        //reset
        
        c.translate(-this.position.x, -this.position.y);
    }

    update(){
        let xTouch = false;
        let yTouch = false;

        if(tileMap[parseInt(player.position.x/tileSize - xShift/2)][parseInt(player.position.y/tileSize - yShift/2)].walkable)
            player.onTile = tileMap[parseInt(player.position.x/tileSize - xShift/2)][parseInt(player.position.y/tileSize - yShift/2)]
        
        for(let x = 0; x<x_tileNum; x++){   
            for(let y = 0; y<y_tileNum; y++){
                if(tileMap[x][y].walkable == false){
                    let collision1 = circleRect(this.velocity.x + this.position.x+ this.pushVelocity.x, this.position.y, this.hitBoxSize/2 + 20, 
                        tileMap[x][y].x * tileSize, tileMap[x][y].y * tileSize - tileSize, tileMap[x][y].width, tileMap[x][y].height)
                    let collision2 = circleRect(this.position.x, this.velocity.y + this.position.y+ this.pushVelocity.y, this.hitBoxSize/2 + 20, 
                        tileMap[x][y].x * tileSize, tileMap[x][y].y * tileSize - tileSize, tileMap[x][y].width, tileMap[x][y].height)
                    
                    if(collision1){
                        xTouch = true;
                    }
                    if(collision2){
                        yTouch = true;
                    }
                }
            }
        }
        ////
        if(!xTouch && this.position.x + this.velocity.x + this.pushVelocity.x > xShift/2 * tileSize &&
            this.position.x + this.velocity.x + this.pushVelocity.x < canvas.width - xShift/2 * tileSize ){

            this.position.x += this.velocity.x + this.pushVelocity.x;
            
        }  
        if(!yTouch && this.position.y + this.velocity.y + this.pushVelocity.y > yShift/2 * tileSize &&
            this.position.y + this.velocity.y + this.pushVelocity.y < canvas.height - yShift/2 * tileSize - yShift/4){

            this.position.y += this.velocity.y + this.pushVelocity.y;
            
        }
        this.weaponPushVelocity.x /= 1.5;
        this.weaponPushVelocity.y /= 1.5;

        this.pushVelocity.y/=1.5;
        this.pushVelocity.x/=1.5;
        if(this.idleSwitch){
            this.idleY += this.idleAcceleration;
            if(this.idleY > 2 )this.idleAcceleration -= 0.001;
            else this.idleAcceleration += 0.001;
            if(this.idleY > 4) this.idleSwitch = false;
        }else{
            this.idleY -= this.idleAcceleration;
            if(this.idleY < 2 )this.idleAcceleration -= 0.001;
            else this.idleAcceleration += 0.001;
            if(this.idleY < 0) this.idleSwitch = true;
        }

        if(this.shootDelay >= 1){
            this.shootDelay -= 0.1;
        }
    }
}