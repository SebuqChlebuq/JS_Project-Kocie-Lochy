class Tile{
    constructor(x, y, width, height, walkable){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = 'rgb(255,255,255,0.1)'
        this.walkable = walkable;
        this.image = columnImg;

        this.gscore = 0;
        this.hscore = 0
        this.fscore = 0;
        
        this.cameFrom = null;
    };
    draw(){
        c.beginPath();
        c.rect(this.x * tileSize, this.y * tileSize,
            this.width, this.height)

        if(this.walkable)
        {
            c.lineWidth = 1;
            c.strokeStyle = this.color;
            c.stroke();

            c.fillStyle = 'rgb(255,255,255,0.5)'
            //c.fillText(this.x + "; " + this.y, this.x* tileSize  + tileSize/2, this.y*tileSize - 4 + tileSize);
            c.font = "20px serif";
            //c.fillText(Math.round(this.fscore), (this.x+0.1)* tileSize, (this.y+0.5)*tileSize + 5)
            c.font = "12px serif";
           // c.fillText(Math.round(this.gscore), (this.x+0.1)* tileSize, (this.y+0.8)*tileSize + 5)
            //c.fillText(Math.round(this.hscore), (this.x+0.1)* tileSize, (this.y+0.2)*tileSize + 5)
        }else{
            this.image.draw(this.x*tileSize,this.y*tileSize - tileSize*2,
                tileSize, tileSize*3);
        }
        
        c.closePath();
    };
};