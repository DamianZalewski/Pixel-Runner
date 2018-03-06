const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = screen.width;
canvas.height = screen.height;
var cw = canvas.width;
var ch = canvas.height;
// variables
// player
var playerImage = new Image();
playerImage.src = "img/character.png";
var playerX = 50;
var playerY = 50;
var playerWidth = 50;
var playerHeight = 50;
// background
var backgroundImage = new Image();
backgroundImage.src = "img/background.png";
var backgroundX = 0;
var backgroundY = 0;
var backgroundWidth = cw;
var backgroundHeight = ch;



// initial game logic 
 setInterval(game, 1000/60);


 function game() {
     gameBoard();
     drawBackground();
     drawPlayer();
     backgroundX-=5;
     
 }

// draw background black game board
 function gameBoard() {
     ctx.fillStyle = "black";
     ctx.fillRect(0, 0, cw, ch);
 }

// draw player character and his animation
function drawPlayer(){
    ctx.drawImage(playerImage,playerX,playerY,playerWidth,playerHeight);
}

function drawBackground(){
    ctx.drawImage(backgroundImage,backgroundX,backgroundY,backgroundWidth,backgroundHeight);
    ctx.drawImage(backgroundImage,backgroundX+backgroundWidth,backgroundY,backgroundWidth,backgroundHeight);
    if(backgroundX<-backgroundWidth)backgroundX = 0;
}