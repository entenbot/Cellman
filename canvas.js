//CELLMAN

//gets postion coordinate from mouse (wich row/collumn was clicked)
function coordinates(mousePosition){           
    if (mousePosition < cellSize){
        return 0;
    };
    let position = 1;
    while (mousePosition > cellSize*position){
        position+=1;
    };
    return position-1;
};

//translates position coordinates from cordinates to canvas position
function toField (pos){    
    pos = (pos+1)*cellSize;
    if (pos == 0){
        return 0;
    } else {
        return pos - cellSize;
    };
};

//counting max rows and collumns
function maxRows(cellSize){
    if (cellSize == 0){
      return 0;
    };
    maxGrid = 0;
    while(cellSize * maxGrid <= canvas.width){
      maxGrid += 1;
    };
     return maxGrid -=1;
};

function maxCollumns(cellSize){
    if (cellSize == 0){
      return 0;
    };
    maxGrid = 0;
    while(cellSize * maxGrid <= canvas.height){
      maxGrid += 1;
    };
     return maxGrid -=1;
};

///clears field and canvas
function clears(){
    console.clear()
    gameBoard = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawField();
};

//draws field
//i should probably draw my field with lines not with rectangles...
function drawField(){ 
    let row = 0;
    let collumn = 0;
    for (i= 0; i < maxC; i++){
        row = 0;
        for (b = 0; b< maxR; b++){
            ctx.rect(row,collumn,cellSize,cellSize);
            row += cellSize;
        } 
        collumn += cellSize;
    ctx.stroke();
}}

function randomRgb(){
    let r = Math.floor(Math.random()*41);
    let g = Math.floor(Math.random()*20);
    let b = Math.floor(Math.random()*31);
    return 'rgba('+r+', '+g+', '+b+')';     
};

function randomRgbReddish(){
    let r = Math.floor(Math.random()*181);
    let g = Math.floor(Math.random()*20);
    let b = Math.floor(Math.random()*31);
    return 'rgba('+r+', '+g+', '+b+')';     
};

function drawBoard(){
    getNeighbors()
    gameBoard.forEach(element => {
        if (JSON.stringify(element.l) == 0){
            ctx.fillStyle = n0;
        };
        if (JSON.stringify(element.l) == 1){
            ctx.fillStyle = n1;        
        };
        if (JSON.stringify(element.l) == 2){
            ctx.fillStyle = n2;        
        };
        if (JSON.stringify(element.l) == 3){
            ctx.fillStyle = n3; 
        };
        if (JSON.stringify(element.l) == 4){
            ctx.fillStyle = n4;  
        };
        if (JSON.stringify(element.l) == 5){
            ctx.fillStyle = n5;  
        };
        if (JSON.stringify(element.l) == 6){
            ctx.fillStyle = n6;  
        };
        if (JSON.stringify(element.l) == 7){
            ctx.fillStyle = n7; 
        };
        if (JSON.stringify(element.l) == 8){
            ctx.fillStyle = n8;
        };
        ctx.fillRect(toField(element.x),toField(element.y),cellSize,cellSize);
    });
};

//checks if stone is on gameboard list
function isUnique(object){
    if (object.x == stone.x && object.y == stone.y){
        return false;
    } else { 
        return true;
    }
};

//animation loop
function loop()
{
    drawBoard();
};

function showNeighbors(){
    gameBoard.forEach(element => {
        ctx.fillRect(toField(element.x-1),toField(element.y+1),cellSize,cellSize);
        ctx.fillRect(toField(element.x-1),toField(element.y),cellSize,cellSize);
        ctx.fillRect(toField(element.x-1),toField(element.y-1),cellSize,cellSize);
        ctx.fillRect(toField(element.x),toField(element.y+1),cellSize,cellSize);
        ctx.fillRect(toField(element.x),toField(element.y-1),cellSize,cellSize);
        ctx.fillRect(toField(element.x+1),toField(element.y+1),cellSize,cellSize);
        ctx.fillRect(toField(element.x+1),toField(element.y),cellSize,cellSize);
        ctx.fillRect(toField(element.x+1),toField(element.y-1),cellSize,cellSize);
        })
    drawField();
}

function getNeighbors(){
    console.clear();
    let neighbors = 0;
    let potNeighborList = []
    let stoneList = []
    gameBoard.forEach(element => {
        stoneList.push({x: element.x,y: element.y})
    });
    gameBoard.forEach(element => {
        potNeighborList.push({x: element.x-1,y: element.y+1});
        potNeighborList.push({x: element.x-1,y: element.y});
        potNeighborList.push({x: element.x-1,y: element.y-1});
        potNeighborList.push({x: element.x,y: element.y+1});
        potNeighborList.push({x: element.x,y: element.y-1});
        potNeighborList.push({x: element.x+1,y: element.y+1});
        potNeighborList.push({x: element.x+1,y: element.y-1});
        potNeighborList.push({x: element.x+1,y: element.y});

        for (n = 0; n < potNeighborList.length; n++){
            for (b = 0; b < stoneList.length; b++){
                if (JSON.stringify(potNeighborList[n]) == JSON.stringify(stoneList[b])){
                    neighbors += 1;
                }
            }
        }
        element.l = neighbors;
        potNeighborList = []
        neighbors = 0;
    });
};

function start(){
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    cellSize = parseInt(document.getElementById('inputCellSize').value);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight- (window.innerHeight*.20);
    canvas.width = cellSize*maxRows(cellSize);
    canvas.height = cellSize*maxCollumns(cellSize);
    gameBoard = [];
    maxC = maxCollumns(cellSize);
    maxR = maxRows(cellSize);
    drawField();
    setInterval(loop,200); 
    
    n8 = "rgba(255, 0, 0)";
    n7 = "rgba(220, 0, 0)";
    n6 = "rgba(180, 0, 0)";
    n5 = "rgba(140, 0, 0)";
    n4 = "rgba(123, 0, 0)";
    n3 = "rgba(90, 0, 0)";
    n2 = "rgba(70, 0, 0)";
    n1 = "rgba(50, 0, 0)";
    n0 = "rgba(0, 0, 0)";
}

start()

//adds clicked fields to map
ctx.canvas.addEventListener('click', function(event) {
    var mouseX = event.clientX - ctx.canvas.offsetLeft;
    var mouseY = event.clientY - ctx.canvas.offsetTop;
    document.querySelector('output').innerHTML = coordinates(mouseX) + '|' +coordinates(mouseY);
    
    stone = {x: coordinates(mouseX),y: coordinates(mouseY),l: 1};
    
    let wasDeleted = false;
    gameBoard.forEach(element => {
        if (element.x == stone.x && element.y == stone.y){
            ctx.fillStyle='rgb(252, 224, 190)'
            ctx.fillRect(toField(element.x),toField(element.y),cellSize,cellSize);
            ctx.rect(toField(element.x),toField(element.y),cellSize,cellSize);
            ctx.stroke();
            wasDeleted = true;
        } 
    });
    gameBoard = gameBoard.filter(isUnique);
    if (wasDeleted == false){
        gameBoard.push(stone);
    };
})
    



















///export and import board list.



