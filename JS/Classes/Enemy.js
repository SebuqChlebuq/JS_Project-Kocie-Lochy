class Enemy{
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        };
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rad = 0;
        this.width = 90;
        this.height = 90;

        this.moveTo;

        this.idleY = 0;
        this.idleSwitch = true;
        this.idleAcceleration = 0.001;
        this.gunPosition = {
            x: 0,
            y: 5
        }
        this.gunSize = {
            width: 45,
            height: 35
        }
        this.pushVelocity = {
            x: 0,
            y: 0
        }
        this.weaponPushVelocity = {
            x: 0,
            y: 0
        }
        this.hitBoxSize = this.height/2
        this.drawed = false;
        
        this.setShootDelay = 4;
        this.shootDelay = this.setShootDelay;

        this.markSize = 100
        this.markRotation = (Math.random() > 0.5) ? -0.1 : 0.1;
        this.spawned = false;

        this.bodyImg = new Sprite("Img/Enemies/Szczurek/Sczurek_body.png");
        this.weaponImg = new Sprite("Img/Enemies/Szczurek/Sczurek_gun.png");
        this.health = 10
    }

    shoot(){
        if(this.shootDelay < 1){
            this.shootDelay = this.setShootDelay
            let velocity = {
                x: Math.cos(this.rad),
                y: Math.sin(this.rad)
            }
            let speed = 15;
            let x = this.position.x + this.gunPosition.x + velocity.x * this.gunSize.width/2;
            let y = this.position.y + this.gunPosition.y + velocity.y * this.gunSize.width/2 - 10; 
            bullets.push(new Bullet(x, y, velocity, speed, enemyBulletImg, "enemy"));
            
            this.pushVelocity.x = -velocity.x * 10;
            this.pushVelocity.y = -velocity.y * 10;
            
            this.weaponPushVelocity.x = -velocity.x * 30;
            this.weaponPushVelocity.y = -velocity.y * 30;
        }else{
            this.shootDelay -= 0.1;
        }
    }
    draw(){
        if(this.spawned)
        {
            c.shadowOffsetX = 5;
            c.shadowOffsetY = 5;

            //set center point
            c.translate(this.position.x, this.position.y);
            
            if(player.position.x >= this.position.x){//prawo
                c.rotate(this.rad/8)
                this.bodyImg.draw(-this.width/2,-this.height/2 - this.idleY,
                this.width, this.height);

                c.translate(this.gunPosition.x,this.gunPosition.y)
                c.rotate(this.rad/8*7)
                this.weaponImg.draw(-this.gunSize.width/2 + 5 + this.weaponPushVelocity.x ,-this.gunSize.height/2 + this.weaponPushVelocity.y,
                    this.gunSize.width,this.gunSize.height);
                c.rotate(-this.rad/8*7)
                c.translate(-this.gunPosition.x,-this.gunPosition.y)
                c.rotate(-this.rad/8)

            }else{//lewo
                c.scale(-1,1);

                if((this.rad)/8 < 0) c.rotate(-(this.rad + Math.PI)/8);
                else c.rotate(-(this.rad - Math.PI)/8);

                this.bodyImg.draw(-this.width/2,-this.height/2 - this.idleY,
                this.width, this.height);

                c.translate(this.gunPosition.x,this.gunPosition.y)

                if((this.rad)/8 < 0) c.rotate(-(this.rad + Math.PI)/8*7);
                else c.rotate(-(this.rad - Math.PI)/8*7);

                this.weaponImg.draw(-this.gunSize.width/2 + 5 + this.weaponPushVelocity.x ,-this.gunSize.height/2 + this.weaponPushVelocity.y,
                    this.gunSize.width,this.gunSize.height);
                
                if((this.rad)/8 < 0) c.rotate((this.rad + Math.PI)/8*7);
                else c.rotate((this.rad - Math.PI)/8*7);
                
                c.translate(-this.gunPosition.x,-this.gunPosition.y)

                if((this.rad)/8 < 0) c.rotate((this.rad + Math.PI)/8);
                else c.rotate((this.rad - Math.PI)/8);
                c.scale(-1,1);
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
            
            c.translate(-this.position.x, -this.position.y);
        }else
        {
            c.translate(this.position.x, this.position.y);
            c.rotate(this.markRotation)
      
            enemyMarkImg.draw(-this.markSize/2, -this.markSize/2, this.markSize, this.markSize);
            
            c.rotate(-this.markRotation)
            c.translate(-this.position.x , -this.position.y );
        }
    }

    update(){
        if(this.spawned)
        {
            this.rad = Math.atan2(player.position.y - this.position.y,
                player.position.x - this.position.x);

            let isWall = false
            const rayPoints = dda(this.position.x, this.position.y, player.onTile.x*tileSize, player.onTile.y*tileSize)
            for(let i = 0; i<rayPoints.length;i++){
                if(tileMap[parseInt(rayPoints[i].x/tileSize - xShift/2)][parseInt(rayPoints[i].y/tileSize - yShift/2)] !== 'undefined'){
                    if(!tileMap[parseInt(rayPoints[i].x/tileSize - xShift/2)][parseInt(rayPoints[i].y/tileSize - yShift/2)].walkable){
                        isWall = true
                    }
                }
            }

            if(Math.sqrt(Math.pow(player.position.y - this.position.y,2) + Math.pow(player.position.x - this.position.x,2)) >= tileSize * 5 || isWall){
                
                this.moveTo = findPath(tileMap[parseInt(this.position.x/tileSize - xShift/2)][parseInt(this.position.y/tileSize - yShift/2)],
                player.onTile);
                
                const moveRad = Math.atan2((this.moveTo.y + 0.5) * tileSize - yShift/2 - this.position.y,
                    (this.moveTo.x + 0.5) * tileSize - xShift/2 - this.position.x);
                this.velocity.x = Math.cos(moveRad) * 2;
                this.velocity.y = Math.sin(moveRad) * 2;
            }else{
                this.velocity.x /= 1.1;
                this.velocity.y /= 1.1;

                this.shoot();
            }

            let xTouch = false;
            let yTouch = false;
            
            for(let x = 0; x<x_tileNum; x++){   
                for(let y = 0; y<y_tileNum; y++){
                    if(tileMap[x][y].walkable == false){
                        // collision = CircleRectangleCollision(
                        //     {position: bullets[i].position, radius: 5},
                        //     {position: {x: tileMap[x][y].x * tileSize, y: tileMap[x][y].y* tileSize},
                        //     width: tileMap[x][y].width, height: tileMap[x][y].height});

                        let collision1 = circleRect(this.velocity.x + this.position.x+ this.pushVelocity.x, this.position.y, this.hitBoxSize/2 - 5, 
                            tileMap[x][y].x * tileSize, tileMap[x][y].y * tileSize - tileSize, tileMap[x][y].width, tileMap[x][y].height)
                        let collision2 = circleRect(this.position.x, this.velocity.y + this.position.y+ this.pushVelocity.y, this.hitBoxSize/2 - 5, 
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
                this.position.y + this.velocity.y + this.pushVelocity.y < canvas.height - yShift/2 * tileSize ){

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
        }else{
            this.markSize -= 0.5;
            this.markRotation*= 1.03;

            if(this.markSize <= 0 ) this.spawned = true;
        }
    }
};