const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = screen.width;
canvas.height = screen.height;
var cw = canvas.width;
var ch = canvas.height;
// variables
// player
var playerImage1 = new Image();
playerImage1.src = "img/character1.png";
var playerImage2 = new Image();
playerImage2.src = "img/character2.png";
var playerImage3 = new Image();
playerImage3.src = "img/character3.png";
var playerX = 200;
var playerY = ch-200;
var playerWidth = 50;
var playerHeight = 50;
// background
var backgroundImage = new Image();
backgroundImage.src = "img/background.png";
var backgroundX = 0;
var backgroundY = 0;
var backgroundWidth = cw;
var backgroundHeight = ch;

//----------------
var playerAnimationTimer = 0;

//----------------
var jump = false;
var jumpHigh = 30;
var jumpCounter = 0;

//----------------
var playerAnimationStage = 1;

var floorY = playerY+playerHeight;
//------------
var holesCounter = 0;
var holesArray = [];
var holeWidth = 50;
//-----------------
var shotsArray = [];
var shotWidth = 10;
var shotHeight = 10;
var shotY = playerY + playerHeight/2;
var shotCounter = 0;
// initial game logic 
init();
 setInterval(game, 1000/60);


 function game() {
     tryHole();
     gameBoard();
     drawBackground();
     jumpHandler();
     drawPlayer();
     drawFloor();
     drawHole();
     drawShot();
     update();
     checkHoleCollision();

 }
function shot(){
    shotsArray[shotCounter] = (playerX+playerWidth);
    shotCounter++;
}
function shotHandler(){
    
}
function shotCollision(){
    
}
function drawShot(){
    for(var i=0;i<shotsArray.length;i++){
        ctx.fillStyle = "black";
        ctx.fillRect(shotsArray[i],shotY,shotWidth,shotHeight);
    }
}


function update(){
         backgroundX-=5;
     playerAnimationTimer++;
     moveHole();
}

function init()
{
    canvas.addEventListener("click",jumpStart,false);
    document.addEventListener("keydown",shot,false);
}
function jumpStart(){
    jump = true;
}

function jumpHandler(){
    
    if(jump && jumpCounter<jumpHigh){
        playerY-=5;
        jumpCounter++;
    }else
        if(jump && jumpCounter<2*jumpHigh)
            {
                playerY+=5;
                jumpCounter++;
            }
    
    if(jumpCounter>=2*jumpHigh)
        {
            jumpCounter = 0;
            jump = false;
        }
}

// draw background black game board
 function gameBoard() {
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, cw, ch);
 }


// draw player character and his animation
function drawPlayer(){
    switch(playerAnimationStage){
        case 0:ctx.drawImage(playerImage1,playerX,playerY,playerWidth,playerHeight);
            break;
        case 1:ctx.drawImage(playerImage2,playerX,playerY,playerWidth,playerHeight);
            break;
        case 2: ctx.drawImage(playerImage3,playerX,playerY,playerWidth,playerHeight);
            break;
    }
    if(playerAnimationTimer==5) {
        playerAnimationStage++;
        playerAnimationTimer = 0;
    }
if(playerAnimationStage>2) playerAnimationStage = 0;
}

function drawBackground(){
    ctx.drawImage(backgroundImage,backgroundX,backgroundY,backgroundWidth,backgroundHeight);
    ctx.drawImage(backgroundImage,backgroundX+backgroundWidth,backgroundY,backgroundWidth,backgroundHeight);
    if(backgroundX<-backgroundWidth)backgroundX = 0;
}

function drawFloor(){
    ctx.fillStyle = "green";
     ctx.fillRect(0,floorY,cw,ch-floorY);
}
function tryHole(){
        if((Math.floor(Math.random()*100)+1)==1){
    
        holesArray[holesCounter] = cw+50;
                holesCounter++;
    }
}
function drawHole(){
    ctx.fillStyle = "black";
    for(var i = 0;i<holesArray.length;i++){
        ctx.fillRect(holesArray[i],floorY,holeWidth,ch-floorY);
    }
}

function moveHole(){
    for(var i=0;i<holesArray.length;i++){
        holesArray[i] -=5;
        if(holesArray[i]<=-100){
          holesArray.splice(i,1);
            holesCounter--;
        }
    }
}

function checkHoleCollision(){
for(var i=0;i<holesArray.length;i++){
    if(((holesArray[i]<=playerX+playerWidth && 
      holesArray[i]>=playerX) ||
       (holesArray[i]+holeWidth <= playerX+playerWidth &&
        holesArray[i]+holeWidth >= playerX
        )) && !jump
      ) console.log("GAME OVER!!!");
}
}


