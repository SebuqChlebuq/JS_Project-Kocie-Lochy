class Sprite{
    constructor(src){
        this.image = new Image();
        this.image.src = src;
    }

    draw(x, y, width, height){
        c.drawImage(this.image, 0,0, this.image.width, this.image.height,
            x, y, width, height);
    }
};