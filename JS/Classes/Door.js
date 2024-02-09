class Door{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    }

    preview(){
        c.fillStyle = 'white';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
};
