
//gets postion coordinate from mouse (wich row/collumn)
function coordinates(mousePosition){           
    if (mousePosition < cellSize){
        return 0;
    };
    let position = 1
    while (mousePosition > cellSize*position){
        position+=1;
    };
    return position;
};


//translates position coordinates from cordinates to canvas position
function toField (pos){    
    pos = pos*cellSize;
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




//getting input from webpage and setting up the canvas element. 

var cellSize = parseInt(document.getElementById('inputCellSize').value);
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight- (window.innerHeight*.20);

ctx = canvas.getContext('2d');







//adds clicked fields to map
ctx.canvas.addEventListener('click', function(event) {
    var mouseX = event.clientX - ctx.canvas.offsetLeft;
    var mouseY = event.clientY - ctx.canvas.offsetTop;
    document.querySelector('output').innerHTML = coordinates(mouseX) + '|' +coordinates(mouseY);
    
    
    ctx.fillRect(toField(coordinates(mouseX)),toField(coordinates(mouseY)),cellSize,cellSize);
       
    ctx.stroke();
})

canvas.width = cellSize*maxRows(cellSize);
canvas.height = cellSize*maxCollumns(cellSize);
drawField();



