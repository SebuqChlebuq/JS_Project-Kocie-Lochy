window.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'w':
            keys.w = true;
            break
        case 's':
            keys.s = true;
            break
        case 'a':
            keys.a = true;
            break
        case 'd':
            keys.d = true;
            break
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'w':
            keys.w = false;
            break
        case 's':
            keys.s = false;
            break
        case 'a':
            keys.a = false;
            break
        case 'd':
            keys.d = false;
            break
    }
});

addEventListener("mousemove", function (event){
    mouse.x = event.offsetX;
    mouse.y = event.offsetY
});

addEventListener("mousedown", function(){
    player.shoot();
});

addEventListener('resize', function(){
    title.style.top = window.innerHeight/2 - canvas.height/2 - 100 + 'px';
});