function Walkable_OR_Undefined(x, y){
    if(typeof tileMap[x][y] === "undefined" || tileMap[x][y].walkable) return true;
    return false;
}

function FindNeighbours(x, y){
    const neighbours = []

    if(x > 0 && Walkable_OR_Undefined(x - 1, y)){
        if(Walkable_OR_Undefined(x - 1, y + 1)){
            neighbours.push(tileMap[x - 1][y])
        }
        
        if(y > 0 && Walkable_OR_Undefined(x, y - 1) && Walkable_OR_Undefined(x - 1, y + 1) && Walkable_OR_Undefined(x - 1, y - 1)){
            neighbours.push(tileMap[x - 1][y - 1])
        }

        if(y < y_tileNum-1 && Walkable_OR_Undefined(x, y + 1) && Walkable_OR_Undefined(x, y + 2) && Walkable_OR_Undefined(x - 1, y + 1) && Walkable_OR_Undefined(x - 1, y + 2)){
            neighbours.push(tileMap[x - 1][y + 1])
        }        
    }

    if(x < x_tileNum - 1 && Walkable_OR_Undefined(x + 1, y)){
        if(Walkable_OR_Undefined(x + 1, y + 1)){
            neighbours.push(tileMap[x + 1][y])
        }
        
        if(y > 0 && Walkable_OR_Undefined(x, y - 1) && Walkable_OR_Undefined(x + 1, y + 1) && Walkable_OR_Undefined(x + 1, y - 1)){
            neighbours.push(tileMap[x + 1][y - 1])
        }

        if(y < y_tileNum-1 && Walkable_OR_Undefined(x, y + 1) && Walkable_OR_Undefined(x, y + 2) && Walkable_OR_Undefined(x + 1, y + 1) && Walkable_OR_Undefined(x + 1, y + 2)){
            neighbours.push(tileMap[x + 1][y + 1])
        }        
    }

    if(y > 0){
        if(Walkable_OR_Undefined(x, y-1))
             neighbours.push(tileMap[x][y - 1])
    }
    if(y < y_tileNum-1){
        if(Walkable_OR_Undefined(x, y+1) && Walkable_OR_Undefined(x, y+2))
            neighbours.push(tileMap[x][y + 1])
    }

    return neighbours
}

function returnPath(stop){
    previous = stop
    if(previous.cameFrom == null)
        return previous

    while(previous.cameFrom.cameFrom != null){
        //previous.color = 'red';
        previous = previous.cameFrom;
    }
    //previous.color = 'red';
    return previous
}

function findPath(start, stop){
    for(let x = 0; x < x_tileNum; x++){
        for(let y = 0; y < y_tileNum; y++){
            tileMap[x][y].hscore = 0
            tileMap[x][y].gscore = 999;
            tileMap[x][y].fscore = tileMap[x][y].gscore +  tileMap[x][y].hscore;
            tileMap[x][y].cameFrom = null;
        }
    }
    start.gscore = 0;
    start.hscore = Math.sqrt(Math.pow(start.x - stop.x,2) + Math.pow(start.y - stop.y,2))
    start.fscore = start.gscore + start.hscore

    let openList = [start];
    let closedList = [];
    
    while(openList.length > 0){
        let nexti = 0;
        let f = openList[0].f;
        for(let i = 0; i<openList.length; i++){
            if(openList[i].fscore < f){
                f = openList[i].fscore;
                nexti = i;
            }
        }
        let next = openList[nexti];
        openList.splice(nexti, 1);
        closedList.push(next);

        if(next === stop){
            return returnPath(stop);
        }

        const nextX = Math.round(next.x - xShift/2)
        const nextY = Math.round(next.y - yShift/2)

        const neighbours = FindNeighbours(nextX, nextY);
        
        
        for(let i = 0; i<neighbours.length; i++){
            const neighbour = neighbours[i];
            if(!neighbour.walkable) continue;
            let tentativeGScore = next.gscore + Math.sqrt(Math.pow(next.x - neighbour.x,2) + Math.pow(next.y - neighbour.y,2))

            if(tentativeGScore < neighbour.gscore){
                neighbour.cameFrom = next; 
                neighbour.gscore = tentativeGScore;
                neighbour.hscore = Math.sqrt(Math.pow(neighbour.x - stop.x,2) + Math.pow(neighbour.y - stop.y,2))
                neighbour.fscore = neighbour.gscore + neighbour.hscore;


                let flag = false;

                for(let j = 0; j<openList.length;j++)
                {
                    if(neighbour === openList[j]){
                        flag = true;
                    }
                }
                for(let j = 0; j<closedList.length;j++)
                {
                    if(neighbour === closedList[j]){
                        flag = true;
                    }
                }

                if(!flag){
                    openList.push(neighbour);
                }
            }
        }
    }
}