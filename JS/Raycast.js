//Jak to dziala i czy to dziala dobrze, to ja nie wiem.

function dda(x0, y0, x1, y1){
    const dx = (x1 - x0),
          dy = (y1 - y0),
          s  = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy),
          xi = dx * 1.0 / s,
          yi = dy * 1.0 / s
 
    let x  = x0,
        y  = y0,
        out= []
 
    out.push({x: x0, y: y0});
 
    for (let i = 0; i < s/tileSize*2 - 1; i++) {
        x += xi*tileSize/2;
        y += yi*tileSize/2;
        out.push({x: x, y: y});
    }

    return out
}