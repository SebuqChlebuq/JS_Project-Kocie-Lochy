const tileSize = 60;
const x_tileNum = 16;
const y_tileNum = 10;

const xShift = 2.4
const yShift = 3

const canvas = document.querySelector("canvas");
canvas.width = x_tileNum*tileSize + xShift*tileSize
canvas.height = y_tileNum*tileSize + yShift*tileSize
const c = canvas.getContext('2d');

console.log(window.innerHeight/2 - canvas.height/2 + 'px');
const title = document.getElementById('title')
title.style.top = window.innerHeight/2 - canvas.height/2 - 100 + 'px';

let mouse = {
    x: innerHeight/2,
    y: innerHeight/2
};
const player = new Player();
const keys = {
    w: false,
    s: false,
    a: false,
    d: false
};
const bullets = [];
const tileMap = [];
const enemies = [];

enemies.push(new Enemy(660,400));

function circleRect(cx, cy, radius, rx, ry, rw, rh) {

    // temporary variables to set edges for testing
    let testX = cx;
    let testY = cy;
  
    // which edge is closest?
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
  
    // get distance from closest edges
    const distX = cx-testX;
    const distY = cy-testY;
    const distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    // if the distance is less than the radius, collision!
    if (distance <= radius) {
      return true;
    }
    return false;
}

const columnImg = new Sprite("Img/Column.png");
const bulletImg = new Sprite("Img/Bullet.png");
const doorImg = new Sprite("Img/Door.png");
const wallImg = new Sprite("Img/Wall.png");
const cornerImg = new Sprite("Img/Corner.png");

function setTileMap(){
    for(let x = 0; x<x_tileNum; x++){   
        tileMap[x] = {}
        for(let y = 0; y<y_tileNum; y++){
            tileMap[x][y] = new Tile(x + xShift/2, y + yShift/2, tileSize, tileSize, true);
        }
    }

    for(let x = 0; x<3; x++){
        tileMap[2+x][8].walkable = false
    }
    for(let y = 0; y<2; y++){
        tileMap[2 + y][3+y].walkable = false
    }
    for(let y = 0; y<5; y++){
        tileMap[8][4+y].walkable = false
    }
    for(let x = 0; x<3; x++){
        tileMap[5+x][4].walkable = false
    }
   
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    for(let x = 0; x<x_tileNum; x++){
        for(let y = 0; y<y_tileNum; y++){
            tileMap[x][y].color = 'rgb(255,255,255,0.1)'
        }
    }

    animatePlayer();
    animateEnemies();
    animateBullets();

    animateTileMap();
    
    
}
c.imageSmoothingEnabled = false;
setTileMap();
animate();