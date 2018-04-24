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
//player lifes variables
var playerLifes = 3;
var playerLifesImage = new Image();
playerLifesImage.src = "img/playerLife.png"
var playerLifeX = 30;
var playerLifeY = 30;
var playerLifeWidth = 30;
var playerLifeHeight = 30;
var playerLifeSpace = 20+playerLifeWidth;
var mortal = true;

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
var jumpHigh = 50;
var jumpCounter = 0;
var jumpSpeed = 5;
//----------------
var playerAnimationStage = 1;

var floorY = playerY+playerHeight;
//------------
var holesCounter = 0;
var holesArray = [];
var holeWidth = 50;
//-----------------
var birdsCounter = 0;
var birdXArray = [];
var birdYArray = [];
var birdWidth = 40;
var birdHeight = 40;
var birdImage = new Image();
birdImage.src = "img/bird.png";
var swingCounter = 0;
var swingBool = false;
//-----------------
var shotsXArray = [];
var shotsYArray = [];
var shotWidth = 30;
var shotHeight = 30;
var shotY = playerY + playerHeight/2;
var shotCounter = 0;
var shotAmmo = 5;
var shotAmmoReload = 3000;
var bulletImage  = new Image();
bulletImage.src = "img/bullet.png";
var bulletImage2  = new Image();
bulletImage2.src = "img/bullet2.png";
var bulletImage3  = new Image();
bulletImage3.src = "img/bullet3.png";
var bulletWidth = 50;
var bulletHeight = 50;
var bulletX = cw-100;
var bulletY =20;
var bulletAnimationStage = 0;
var bulletAnimationTimer = 0;
//----------------
var score=0;
var scoreIncreaseTime = 1000;
//----------------
var gameStage  = 0;
//----------------
var mainMenubuttonWith = 400;
var mainMenubuttonHeight = 100;
var mainMenubuttonX = cw/2 - mainMenubuttonWith/2;
var mainMenubuttonY = ch/2 - mainMenubuttonHeight*3;
//-----------------
var stopMenuBackgroundWidth = 500;
var stopMenuBackgroundHeight = 300;
var stopMenuX = cw/2 - stopMenuBackgroundWidth/2;
var stopMenuY = 100;
var stopMenuButtonWidth = 300;
var stopMenuButtonHeight = 50;
var stopMenuButtonX = stopMenuX + (stopMenuBackgroundWidth/2) - (stopMenuButtonWidth/2);
var stopMenuButtonY = stopMenuY+stopMenuBackgroundHeight - 100;
var stopButtonSpace = 100;
//----------------------------
var gameOverMenuButtonWidth = 350;
var gameOverMenuButtonHeight = 50;
var gameOverMenuButtonX = cw/2- gameOverMenuButtonWidth/2;
var gameOverMenuButtonY = ch/2;

//----------------------------
// 0 - main menu, 1 - game, 2 - game stop menu, 3 - game over menu  



// initial game logic 
 setInterval(game, 1000/60);
var bulletInterval;
var scoreInterval;

 function game() {
     switch(gameStage){
         case 0 : mainMenu();
             break;
         case 1 :   
             gameLogic();
             break;
         case 2 : stopMenu();
             break;
         case 3 : gameOverMenu();
             break;
     }

 }
//-------------------------
function gameOverMenu(){
    stopIntervals();
    document.addEventListener("click",gameOverMenuHandler);
    canvas.removeEventListener("click",shot);
    document.removeEventListener("keydown",keyHandler);
    ctx.fillStyle = "red";
    ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle = "black";
    ctx.font = "50px arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER",cw/2,ch/2-200)
    ctx.fillText("Score: "+score,cw/2,ch/2-150);
    ctx.fillRect(gameOverMenuButtonX,gameOverMenuButtonY,gameOverMenuButtonWidth,gameOverMenuButtonHeight);

}

function gameOverMenuHandler(ev){

    if(     ev.clientY>=gameOverMenuButtonY && 
        ev.clientY <= gameOverMenuButtonY + gameOverMenuButtonHeight && 
        ev.clientX >=gameOverMenuButtonX &&  
        ev.clientX <=gameOverMenuButtonX +gameOverMenuButtonWidth
      ){
    gameStage = 0;
    document.removeEventListener("click",gameOverMenuHandler);
    fullReset();
    }
}

//--------------------------
function fullReset(){
 playerY = ch-200;
//player lifes variables
 playerLifes = 3;
 mortal = true;
 backgroundX = 0;
 backgroundY = 0;
//---------------
 playerAnimationTimer = 0;
//---------------
 jump = false;
 jumpHigh = 50;
 jumpCounter = 0;
 jumpSpeed = 5;
//--------------
 playerAnimationStage = 1;
 floorY = playerY+playerHeight;
//-----------
 holesCounter = 0;
 holesArray = [];
//----------------
 birdsCounter = 0;
 birdXArray = [];
 birdYArray = [];
 swingCounter = 0;
 swingBool = false;
//----------------
 shotsXArray = [];
 shotsYArray = [];
 shotY = playerY + playerHeight/2;
 shotCounter = 0;
 shotAmmo = 5;
 shotAmmoReload = 3000;
 bulletX = cw-100;
 bulletY =20;
 bulletAnimationStage = 0;
 bulletAnimationTimer = 0;
//--------------
 score=0;
 scoreIncreaseTime = 1000;
//---------------  
}


//---------------------------
function stopMenu(){
    stopIntervals();
    canvas.removeEventListener("click",shot);
    document.removeEventListener("keydown",keyHandler);
    document.addEventListener("keydown",stopMenuHandler);
    document.addEventListener("click",stopMenuHandler);
    drawStopMenu();

}

function stopMenuHandler(ev){
        if(ev.keyCode==27)
        {
    document.addEventListener("keydown",keyHandler,false);
    document.removeEventListener("keydown",stopMenuHandler);
    document.removeEventListener("click",stopMenuHandler);
    canvas.addEventListener("click",shot,false);
            gameStage = 1;
            startIntervals();
        }
        else if ( 
        ev.clientY>=stopMenuButtonY && 
        ev.clientY <= stopMenuButtonY + stopMenuButtonHeight && 
        ev.clientX >=stopMenuButtonX &&  
        ev.clientX <=stopMenuButtonX +stopMenuButtonWidth
            ){
            // button nr 2 / exit
            fullReset();
            gameStage = 0;
                document.removeEventListener("keydown",stopMenuHandler);
    document.removeEventListener("click",stopMenuHandler);
            
        }
    else if (
            ev.clientY>=stopMenuButtonY-stopButtonSpace && 
        ev.clientY <= stopMenuButtonY + stopMenuButtonHeight - stopButtonSpace && 
        ev.clientX >=stopMenuButtonX &&  
        ev.clientX <=stopMenuButtonX +stopMenuButtonWidth
    ){
        // button nr 1 / back to the game
    document.addEventListener("keydown",keyHandler,false);
    document.removeEventListener("keydown",stopMenuHandler);
    document.removeEventListener("click",stopMenuHandler);
    canvas.addEventListener("click",shot,false);
            gameStage = 1;
            startIntervals();
    }
      
}

function drawStopMenu(){
    ctx.fillStyle = "yellow";
    ctx.fillRect(stopMenuX,stopMenuY,stopMenuBackgroundWidth,stopMenuBackgroundHeight);
    ctx.fillStyle = "green";
    ctx.fillRect(stopMenuButtonX,stopMenuButtonY,stopMenuButtonWidth,stopMenuButtonHeight);
    ctx.fillStyle = "red";
    ctx.fillRect(stopMenuButtonX,stopMenuButtonY-stopButtonSpace,stopMenuButtonWidth,stopMenuButtonHeight);
}

//----------------------------
function mainMenu(){
    stopIntervals();
    drawMainMenu();
    canvas.addEventListener("click",mainMenuListener,false);
}
function drawMainMenu(){
    ctx.fillStyle = "rgb(23, 130, 222)";
    ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle = "rgb(44, 168, 33)";
    ctx.fillRect(mainMenubuttonX,mainMenubuttonY,mainMenubuttonWith,mainMenubuttonHeight);
    ctx.fillRect(mainMenubuttonX,mainMenubuttonY+mainMenubuttonHeight*2,mainMenubuttonWith,mainMenubuttonHeight);   
}

function mainMenuListener(ev){
    if(
       ev.clientY>=mainMenubuttonY && 
        ev.clientY <= mainMenubuttonY + mainMenubuttonHeight && 
        ev.clientX >=mainMenubuttonX &&  
        ev.clientX <=mainMenubuttonX +mainMenubuttonWith

      ) {
        init();
        canvas.removeEventListener("click",mainMenuListener);
        gameStage = 1;
    }
    else if(
            ev.clientY>=mainMenubuttonY+2*mainMenubuttonHeight && 
        ev.clientY <= mainMenubuttonY + 3*mainMenubuttonHeight && 
        ev.clientX >=mainMenubuttonX &&  
        ev.clientX <=mainMenubuttonX +mainMenubuttonWith
    ){
        alert("top list");
        canvas.removeEventListener("click",mainMenuListener);
        // ---------------- write functions for top lists !-----------------------
        }
}   

//----------------------------
function gameLogic(){
     tryHole();
     tryBird();
     gameBoard();
     drawBackground();
     jumpHandler();
     drawPlayer();
     drawFloor();
     drawHole();
     drawShot();
     drawlifes();
     drawBird();
     drawAmmo();
     drawScore();
     update();
     checkHoleCollision();
     birdPlayerCollision();
     birdBulletCollision();
}


//----------------------------
function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "50px arial";
    ctx.textAlign = "center";
    ctx.fillText("Score: "+score,cw/2,80);
}

function changeScoreByTime(){
    score+=10;
}

function changeScoreByEvent(){
    score +=100;
}

//-----------------------------

function tryBird(){
        if((Math.floor(Math.random()*200    )+1)==1){
    
        birdXArray[birdsCounter] = cw+50+birdWidth;
        birdYArray[birdsCounter] = floorY - Math.floor(Math.random()*100+100);
                birdsCounter++;
    }
}
function drawBird(){
    for(var i = 0;i<birdXArray.length;i++){
        ctx.drawImage(birdImage,birdXArray[i],birdYArray[i],birdWidth,birdHeight);
    }
}

function moveBird(){
    for(var i=0;i<birdXArray.length;i++){
        birdXArray[i] -=10;
        if(birdXArray[i]<=-100){
          birdXArray.splice(i,1);
          birdYArray.splice(i,1);
        birdsCounter--;
        }
    }
}
//-----------------------------------------------------
function birdSwing(){
            if(swingCounter>8) swingBool=!swingBool;
    else if(swingCounter<-8) swingBool =!swingBool;
        if(swingBool) swingCounter++
        else swingCounter--;
    for(var i = 0;i<birdsCounter;i++){
        birdYArray[i] += swingCounter;
    }
}
//-----------------------------------------------------
function birdPlayerCollision(){
    for(var i=0;i<birdXArray.length;i++){
    if (playerX < birdXArray[i] + birdWidth &&
   playerX + playerWidth > birdXArray[i] &&
   playerY < birdYArray[i] + birdHeight &&
   playerHeight + playerY > birdYArray[i]) {
    hitDetected();
}
    }
}

function birdBulletCollision(){
    for(var i=0;i<shotsXArray.length;i++){
        for(var j=0;j<birdXArray.length;j++){
    if (shotsXArray[i] < birdXArray[j] + birdWidth &&
   shotsXArray[i] + shotWidth > birdXArray[j] &&
   shotsYArray[i] < birdYArray[j] + birdHeight &&
   shotHeight + shotsYArray[i] > birdYArray[j]) {
            //destroy bird and bullet
        birdXArray[j] = -100;
        shotsXArray[i] = cw;
        changeScoreByEvent();
}}
    }
}

//-----------------------------

function drawlifes(){
    // 1.show how many lifes player have
    for(var i=0;i<playerLifes;i++){
            ctx.drawImage(playerLifesImage,playerLifeX+playerLifeSpace*i,playerLifeY,playerLifeWidth,playerLifeHeight);
    } 
}

function shot(){
    if(shotAmmo!=0){
        shotAmmo--;
    shotY = playerY + playerHeight/2;
    shotsXArray[shotCounter] = (playerX+playerWidth);
    shotsYArray[shotCounter] = (shotY);
    shotCounter++;
    }
}
function shotMove(){
    for(var i=0;i<shotsXArray.length;i++){
        shotsXArray[i] +=10;
        if(shotsXArray[i]>cw){
            shotsXArray.splice(i,1);
            shotsYArray.splice(i,1);
            shotCounter--;
        }
    }
}

function drawShot(){
    for(var i=0;i<shotsXArray.length;i++){
     
     
    switch(bulletAnimationStage){
        case 0:ctx.drawImage(bulletImage,shotsXArray[i],shotsYArray[i],shotWidth,shotHeight);
            break;
        case 1:ctx.drawImage(bulletImage2,shotsXArray[i],shotsYArray[i],shotWidth,shotHeight);
            break;
        case 2:ctx.drawImage(bulletImage3,shotsXArray[i],shotsYArray[i],shotWidth,shotHeight);
            break;
    }
         } 
    if(bulletAnimationTimer==5) {
        bulletAnimationStage++;
        bulletAnimationTimer = 0;
    }
if(bulletAnimationStage>2) bulletAnimationStage = 0;
}

function drawAmmo(){
    for(var i = 0;i<shotAmmo;i++){
        ctx.drawImage(bulletImage,bulletX-i*bulletWidth/2,bulletY,bulletWidth,bulletHeight);
    }
     
}

function update(){
         backgroundX-=5;
     playerAnimationTimer++;
     bulletAnimationTimer++;
     moveHole();
     moveBird();
     shotMove();
     birdSwing();
}

function init()
{
    document.addEventListener("keydown",keyHandler,false);
    canvas.addEventListener("click",shot,false);
startIntervals();
}

function stopIntervals(){
    clearInterval(bulletInterval);
    clearInterval(scoreInterval);
}

function startIntervals(){
      bulletInterval =   setInterval(reloadAmmo,shotAmmoReload);
      scoreInterval =  setInterval(changeScoreByTime,scoreIncreaseTime);
}

function keyHandler(ev){
    if(ev.keyCode == 27) gameStage = 2;
    else if(ev.keyCode==32) jumpStart();
    
}

function reloadAmmo(){
    if(shotAmmo<5){
        shotAmmo++;
    }
}

function jumpStart(){
    jump = true;
}

function jumpHandler(){
    
    if(jump && jumpCounter<jumpHigh){
        playerY-=jumpSpeed;
        jumpCounter++;
        
    }else
        if(jump && jumpCounter<2*jumpHigh)
            {
         
                playerY+=jumpSpeed;
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
      ){
        hitDetected();
    } 
}
}

function hitDetected(){
            if(playerLifes==0){
                gameStage = 3;
        }else{
           if(mortal){
               playerLifes--;
               mortal = false;
               setTimeout(switchMortal,3000);
           }
            
        }
}

function switchMortal(){
    mortal = true;
}


