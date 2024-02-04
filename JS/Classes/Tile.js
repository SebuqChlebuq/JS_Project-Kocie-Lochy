class Tile{
    constructor(x, y, width, height, walkable){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.walkable = walkable;
        this.image = columnImg;
    };
    draw(){
        c.beginPath();
        c.rect(this.x * tileSize, this.y * tileSize,
            this.width, this.height)

        if(this.walkable)
        {
            c.lineWidth = 1;
            c.strokeStyle = 'rgb(255,255,255,0.1)';
            c.stroke();

            //c.font = "12px serif";
            //c.fillStyle = 'rgb(255,255,255,0.1)'
            //c.fillText(this.x + "; " + this.y, this.x* tileSize  + tileSize/2, this.y*tileSize - 4 + tileSize);

        }else{
            this.image.draw(this.x*tileSize,this.y*tileSize - tileSize*2,
                tileSize, tileSize*3);
        }
        
        c.closePath();
    };
};