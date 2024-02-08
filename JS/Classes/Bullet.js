class Bullet{
    constructor(x, y, velocity, speed, bulletImg, type){
        this.position = {
            x: x,
            y: y
        };
        this.velocity = velocity; //x, y
        this.speed = speed;
        this.drawed = false;
        this.hitBoxSize = 20
        this.image = bulletImg;
        this.type = type;
    }
    
    draw(){
        c.shadowOffsetX = 5;
        c.shadowOffsetY = 5;

        this.image.draw(this.position.x - this.hitBoxSize/2, this.position.y - this.hitBoxSize/2,
            this.hitBoxSize, this.hitBoxSize);
        
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;

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

    collision(i){
        let flag = false;

        //Collision to walls
        for(let x = 0; x<x_tileNum; x++){ 
            for(let y = 0; y<y_tileNum; y++){
                if(tileMap[x][y].walkable == false){
                    let collision = circleRect(this.position.x, this.position.y, 5, 
                        tileMap[x][y].x * tileSize, tileMap[x][y].y * tileSize - tileSize, tileMap[x][y].width, tileMap[x][y].height)
                    if(collision){
                        flag = true;
                    }
                } 
            }
        }
        
        //Collision to Side of maps
        if(this.position.x < xShift/4 * tileSize ||
            this.position.y < yShift/4 * tileSize || 
            this.position.x > canvas.width - xShift/4 * tileSize ||
            this.position.y > canvas.height - yShift/4 * tileSize){
            flag = true
        }

        //Collision To Enemy
        if(this.type == "player")
        {
            for(let e = 0; e<enemies.length; e++)
            {
                if(!enemies[e].spawned) continue
                if(circleCircle(this.position.x, this.position.y,
                    enemies[e].position.x, enemies[e].position.y,
                    this.hitBoxSize, enemies[e].hitBoxSize))
                {
                    enemies[e].pushVelocity = {x: this.velocity.x * 20, y:this.velocity.y * 20}
                    
                    enemies[e].health -= 1;
                    if(enemies[e].health <= 0)
                    {
                        for(let j = 0;j < 30;j++){
                            particles.push(new Particle(enemies[e].position.x, enemies[e].position.y,
                                5, 'red',
                                {x:(Math.random() - 0.5)*25, y:(Math.random() - 0.5)*25},
                                0.005))
                        }
                        let cNum = Math.random()*5 + 3
                        for(let j = 0;j < cNum;j++){
                            coins.push(new Coin(enemies[e].position.x, enemies[e].position.y,
                                {x:(Math.random() - 0.5)*20, y:(Math.random() - 0.5)*20},
                                Math.random()*Math.PI))
                        }

                        enemies.splice(e, 1);
                    }

                    flag = true;   
                }
            }
        }

        //Collision To Player
        if(this.type == "enemy")
        {
            if(circleCircle(this.position.x, this.position.y,
                player.position.x, player.position.y,
                this.hitBoxSize, player.hitBoxSize))
            {
                for(let j = 0;j < 15;j++){
                    particles.push(new Particle(player.health*55 + 10, canvas.height - 40,
                        5, 'red',
                        {x:(Math.random() - 0.5)*15, y:(Math.random() - 0.5)*15},
                        0.01))
                }
                
                player.pushVelocity = {x: this.velocity.x * 10, y:this.velocity.y * 10}
                player.health -= 1;
                if(player.health == 0){
                    setInterval(function(){
                        cancelAnimationFrame(animationId);
                        //UMIERANIE, enemisy znikaja i kot uemira jakos ladniw w samotnosci
                    }, 100)
                }
                flag = true;   
            }
        }

        //Render
        if(flag){
            for(let j = 0;j < 10;j++){
                let color = 'white'
                if(this.image == playerBulletImg) color = "orange"
                else color = "red"

                particles.push(new Particle(this.position.x, this.position.y,
                    5, color,
                    {x:(Math.random() - 0.5)*15, y:(Math.random() - 0.5)*15},
                    0.1))
            }
            bullets.splice(i,1); 
        }
    }
};