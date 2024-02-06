function animatePlayer(){
    player.velocity.x = 0;
    if( keys.d ) player.velocity.x = 5;
    else if (keys.a ) player.velocity.x = -5;
    
    player.velocity.y = 0;
    if( keys.s ) player.velocity.y = 5;
    else if (keys.w ) player.velocity.y = -5;
    player.rad = Math.atan2(mouse.y - player.position.y,
                         mouse.x - player.position.x);

    player.update();
}

function animateEnemies(){
    for(let i = 0;i<enemies.length; i++){
        enemies[i].update();
    }
}

function animateBullets(){
    for(let i = 0; i < bullets.length; i++)
    {   
        let flag = false;
        bullets[i].update();
        for(let x = 0; x<x_tileNum; x++){ 
            for(let y = 0; y<y_tileNum; y++){
                if(tileMap[x][y].walkable == false){
                    let collision = circleRect(bullets[i].position.x, bullets[i].position.y, 5, 
                        tileMap[x][y].x * tileSize, tileMap[x][y].y * tileSize - tileSize, tileMap[x][y].width, tileMap[x][y].height)
                    if(collision){
                        flag = true;
                        //setTimeout(() => {
                        //    bullets.splice(i,1);
                        //}, 0);
                    }
                } 
            }
        }
        
        if(bullets[i].position.x < xShift/4 * tileSize ||
            bullets[i].position.y < yShift/4 * tileSize || 
            bullets[i].position.x > canvas.width - xShift/4 * tileSize ||
            bullets[i].position.y > canvas.height - yShift/4 * tileSize){
                flag = true
            }
        if(flag){
           bullets.splice(i,1); 
        }
    }
}

function renderOnMap(object, tileY){
    let speed = 1;
    if(object.speed){
        speed = object.speed;
    }
    if(!object.drawed && object.position.y - object.velocity.y * speed + object.hitBoxSize - 5 <= (tileY + yShift/2)*tileSize){
        object.drawed = true;
        object.draw();
    }
}

function place(object,rotate, translateX, translateY, width, height){
    c.translate(translateX , translateY)
    
    c.rotate(rotate);
    object.draw(-width/2,-height/2 ,width, height)
    c.rotate(-rotate);

    // c.beginPath();
    // c.lineWidth = 1.2;
    // c.fillStyle = "rgb(255,255,255,1)";
    // c.arc(0, 0, 2 ,0,Math.PI*2, false)
    // c.fill();
    // c.closePath();

    c.translate(-translateX , -translateY)
}

function animateTileMap(){
    {
    place(doorImg, 0,
        (x_tileNum+xShift/2) * tileSize/2 + xShift/2 * tileSize/2, yShift/2 * tileSize/2,
        tileSize*2, yShift/2 * tileSize)

    place(doorImg, Math.PI,
        (x_tileNum+xShift/2) * tileSize/2 + xShift/2 * tileSize/2, (y_tileNum + yShift/2) * tileSize + yShift/2 * tileSize/2,
       tileSize*2, yShift/2 * tileSize)
    
    place(doorImg, -Math.PI/2,
        xShift/2*tileSize/2, y_tileNum/2 * tileSize + yShift*tileSize/2,
        tileSize*2, xShift/2 * tileSize)
    
    place(doorImg, Math.PI/2,
        (x_tileNum+xShift/2) * tileSize + xShift/2 * tileSize/2, y_tileNum/2 * tileSize + yShift*tileSize/2,
        tileSize*2, xShift/2 * tileSize)
    
    place(cornerImg, Math.PI,
        (x_tileNum+xShift/2) * tileSize + xShift/2 * tileSize/2, (y_tileNum + yShift/2) * tileSize + yShift/2 * tileSize/2,
        xShift/2 * tileSize, yShift/2*tileSize)
    place(cornerImg, 0,
        xShift/2 * tileSize/2, yShift/2 * tileSize/2,
        xShift/2 * tileSize, yShift/2*tileSize)
    place(cornerImg, -Math.PI/2,
        xShift/2 * tileSize/2, (y_tileNum + yShift/2) * tileSize + yShift/2 * tileSize/2,
        yShift/2 * tileSize, xShift/2*tileSize)
    place(cornerImg, Math.PI/2,
        (x_tileNum+xShift/2) * tileSize + xShift/2 * tileSize/2, yShift/2 * tileSize/2,
        yShift/2 * tileSize, xShift/2*tileSize)

    for(let i = 0; i<x_tileNum/2-1;i++){
        place(wallImg, 0,
            xShift/2*tileSize + tileSize/2 + i*tileSize ,yShift/2 * tileSize/2,
            tileSize, yShift/2 * tileSize)
    }
    for(let i = x_tileNum/2+1; i<x_tileNum;i++){
        place(wallImg, 0,
            xShift/2*tileSize + tileSize/2 + i*tileSize ,yShift/2 * tileSize/2,
            tileSize, yShift/2 * tileSize)
    }
    for(let i = 0; i<x_tileNum/2-1;i++){
        place(wallImg, Math.PI,
            xShift/2*tileSize + tileSize/2 + i*tileSize ,(y_tileNum + yShift/2) * tileSize + yShift/2 * tileSize/2,
            tileSize, yShift/2 * tileSize)
    }
    for(let i = x_tileNum/2+1; i<x_tileNum;i++){
        place(wallImg, Math.PI,
            xShift/2*tileSize + tileSize/2 + i*tileSize ,(y_tileNum + yShift/2) * tileSize + yShift/2 * tileSize/2,
            tileSize, yShift/2 * tileSize)
    }
    for(let i = 0; i<y_tileNum/2-1;i++){
        place(wallImg, -Math.PI/2,
            xShift/2*tileSize/2 ,tileSize/2 + yShift*tileSize/2 + i*tileSize,
            tileSize, xShift/2 * tileSize)
    }
    for(let i = y_tileNum/2+1; i<y_tileNum;i++){
        place(wallImg, -Math.PI/2,
            xShift/2*tileSize/2 ,tileSize/2 + yShift*tileSize/2 + i*tileSize,
            tileSize, xShift/2 * tileSize)
    }
    for(let i = 0; i<y_tileNum/2-1;i++){
        place(wallImg, Math.PI/2,
            (x_tileNum+xShift/2) * tileSize + xShift/2 * tileSize/2 ,tileSize/2 + yShift*tileSize/2 + i*tileSize,
            tileSize, xShift/2 * tileSize)
    }
    for(let i = y_tileNum/2+1; i<y_tileNum;i++){
        place(wallImg, Math.PI/2,
            (x_tileNum+xShift/2) * tileSize + xShift/2 * tileSize/2 ,tileSize/2 + yShift*tileSize/2 + i*tileSize,
            tileSize, xShift/2 * tileSize)
    }
    }
    
    player.drawed = false;
    for(let i = 0;i<bullets.length; i++){
        bullets[i].drawed = false;
    }
    for(let i = 0;i<enemies.length; i++){
        enemies[i].drawed = false;
    }

    for(let x = 0; x<y_tileNum+2; x++){
        for(let y = 0; y<x_tileNum; y++){
            if(x<y_tileNum){
                tileMap[y][x].draw()
            }
        }
        renderOnMap(player, x);
        
        for(let i = 0;i<bullets.length; i++){
            renderOnMap(bullets[i], x);
        }

        for(let i = 0;i<enemies.length; i++){
            renderOnMap(enemies[i], x)
        }
    }
}