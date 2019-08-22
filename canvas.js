
//gets postion coordinate from mouse (wich row/collumn)
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


//   clears canvas
function cls(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
   
};

//draws field
function drawField(){ 
    let row = 0;
    let collumn = 0;
    for (i= 0; i < maxCollumns(cellSize); i++){
        row = 0;
        for (b = 0; b< maxRows(cellSize); b++){
            ctx.rect(row,collumn,cellSize,cellSize);
            ctx.stroke();
            row += cellSize;
        } 
        collumn += cellSize;
}
}

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
    gameBoard.forEach(element => {
        
        
        
        
        ctx.fillStyle = randomRgbReddish();
        ctx.fillRect(toField(element.x),toField(element.y),cellSize,cellSize);
    
    });
};








}




//getting input from webpage and setting up the canvas element. 

var cellSize = parseInt(document.getElementById('inputCellSize').value);
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight- (window.innerHeight*.20);

ctx = canvas.getContext('2d');

var animationSpeed = 10;
var gameBoard = [];
var stone = {};




//adds clicked fields to map
ctx.canvas.addEventListener('click', function(event) {
    var mouseX = event.clientX - ctx.canvas.offsetLeft;
    var mouseY = event.clientY - ctx.canvas.offsetTop;
    document.querySelector('output').innerHTML = coordinates(mouseX) + '|' +coordinates(mouseY);
    
    
    document.querySelector('output').innerHTML = coordinates(mouseX) + '|' +coordinates(mouseY);
    
    ctx.fillStyle = randomRgb();
    ctx.fillRect(toField(coordinates(mouseX)),toField(coordinates(mouseY)),cellSize,cellSize);

    stone = {x: coordinates(mouseX),y: coordinates(mouseY),l: 1};
    
    
    //need to check if stone object is allready clicked and in the gameboard list
    
    let wasDeleted = false;
    console.clear();
    
    
    gameBoard.forEach(element => {
        if (element.x == stone.x && element.y == stone.y){
            console.log('exists');
            
            
            ctx.fillStyle='rgb(252, 224, 190)'
            ctx.fillRect(toField(element.x),toField(element.y),cellSize,cellSize);
            ctx.rect(toField(element.x),toField(element.y),cellSize,cellSize);
            ctx.stroke();

            
            wasDeleted = true;
        } 
    });

    
    function isUnique(object){
        if (object.x == stone.x && object.y == stone.y){
            return false;
        } else { 
            return true;
        }
    }
    
    const results = gameBoard.filter(isUnique);
    gameBoard = results;

    
    if (wasDeleted == false){
    gameBoard.push(stone);
};
    gameBoard.forEach(element => {
    console.log(element);
    
})
    

    
    
    
    

    
    
    
})
    










canvas.width = cellSize*maxRows(cellSize);
canvas.height = cellSize*maxCollumns(cellSize);



drawField();



function loop(){
  drawBoard();
}
setInterval(loop,200);







