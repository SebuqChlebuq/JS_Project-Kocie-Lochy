const tileSize = 60;
const x_tileNum = 16;
const y_tileNum = 10;

const xShift = 3
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
let bullets = [];
const tileMap = [];
const enemies = [];
let particles = [];
let coins = [];
const doors = [];

function Distance(a,b){
    return Math.sqrt( Math.pow(a,2) + Math.pow(b,2))
}

function circleRect(cx, cy, radius, rx, ry, rw, rh) {

    let testX = cx;
    let testY = cy;
  
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
  
    const distX = cx-testX;
    const distY = cy-testY;
    const distance = Math.sqrt( (distX*distX) + (distY*distY) );
  
    if (distance <= radius) {
      return true;
    }
    return false;
}

function circleCircle(x1,y1, x2,y2, r1,r2) {
    let radSum = r1 + r2;
    let xDist = x1 - x2;
    let yDist = y1 - y2;

    if(radSum >= Distance(xDist, yDist)){
        return true;
    }else{
        return false;
    }
}

const columnImg = new Sprite("Img/Column.png");
const playerBulletImg = new Sprite("Img/PlayerBullet.png");
const enemyBulletImg = new Sprite("Img/EnemyBullet.png");
const doorImg = new Sprite("Img/Door.png");
const wallImg = new Sprite("Img/Wall.png");
const cornerImg = new Sprite("Img/Corner.png");
const heartImg = new Sprite("Img/Heart.png");
const coinImg = new Sprite("Img/Coin.png");
const enemyMarkImg = new Sprite("Img/EnemyMark.png");
const innerCloseDoorImg = new Sprite("Img/closeDoor.png")

let roomClosed = false;
let doorPush = 1;

doors.push(new Door((x_tileNum+xShift/2) * tileSize/2 + xShift/2 * tileSize/2 - tileSize/2, yShift/2 * tileSize/2 - yShift/2 * tileSize/4,
    tileSize, yShift/2 * tileSize/2));
doors.push(new Door((x_tileNum+xShift/2) * tileSize/2 + xShift/2 * tileSize/2 - tileSize/2, (y_tileNum + yShift/2) * tileSize + yShift/2 * tileSize/2 - yShift/2 * tileSize/4,
    tileSize, yShift/2 * tileSize/2));

doors.push(new Door(xShift/2*tileSize/2 -yShift/2 * tileSize/4, y_tileNum/2 * tileSize + yShift*tileSize/2 - tileSize/2,
    yShift/2 * tileSize/2, tileSize));
doors.push(new Door((x_tileNum+xShift/2) * tileSize + xShift/2 * tileSize/2 -yShift/2 * tileSize/4, y_tileNum/2 * tileSize + yShift*tileSize/2 - tileSize/2,
    yShift/2 * tileSize/2, tileSize));

function setTileMap(){
    for(let x = 0; x<x_tileNum; x++){   
        tileMap[x] = {}
        for(let y = 0; y<y_tileNum; y++){
            tileMap[x][y] = new Tile(x + xShift/2, y + yShift/2, tileSize, tileSize, true);
        }
    }
}

let coinsNumber = 0;
let transisionOpacity = 1;

function drawMenu(){
    c.shadowColor = 'black'
    c.shadowOffsetX = 5;
    c.shadowOffsetY = 5;

    c.fillStyle = 'white'
    c.fillRect(20,canvas.height - 135, 20, 120);
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = 'black'
    c.fillRect(20,canvas.height - 135, 20, player.shootDelay/player.setShootDelay * 120);
    
    c.shadowOffsetX = 5;
    c.shadowOffsetY = 5;
    for(let i = 0;i<player.health; i++)
    {
        heartImg.draw(50 + i*55, canvas.height - 60, 50,42);
    }
    coinImg.draw(52, canvas.height - 100,30,35)

    c.fillStyle = 'rgb(255,255,255,1)'
    c.font = "35px Impact";
    
    const padded = (coinsNumber + "").padStart(2, "0");
    c.fillText(padded, 85, canvas.height - 70);
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
}

let animationId;
function animate(){
    animationId = requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    for(let x = 0; x<x_tileNum; x++){
        for(let y = 0; y<y_tileNum; y++){
            tileMap[x][y].color = 'rgb(255,255,255,0.1)'
        }
    }

    animatePlayer();
    animateEnemies();
    animateBullets();
    animateParticles();
    animateCoins();

    animateTileMap();

    drawMenu();

    c.fillStyle = "rgb(0,0,0,"+transisionOpacity+")";
    c.fillRect(0,0, canvas.width, canvas.height);
    transisionOpacity -= 0.02;
}

c.imageSmoothingEnabled = false;
setTileMap();
animate();

let textY = -100;
let textV = 0.1;

function dead()
{
    animationId = requestAnimationFrame(dead)

    c.fillStyle = "rgb(0,0,0,"+transisionOpacity+")";
    c.fillRect(0,0, canvas.width, canvas.height);
    if(transisionOpacity < 1){
        transisionOpacity += 0.001;
    }
    c.fillStyle = 'rgb(255,255,255,1)'
    c.font = "150px Impact";

    c.fillText("UMARŁEŚ...", canvas.width/2 - 300, textY);
    if(textY < canvas.height/2)
    {
        textY += textV;
        textV += 0.05;
    }
}