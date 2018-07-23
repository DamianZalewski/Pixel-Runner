// stone functions
function tryStone() {
    if ((Math.floor(Math.random() * 200) + 1) == 1) {
        stoneXArray[stoneCounter] = cw + stoneWidth;
        stoneCounter++;
    }
}

function drawStone() {
    for (var i = 0; i < stoneXArray.length; i++) {
        ctx.drawImage(stoneImage, stoneXArray[i], stoneY, stoneWidth, stoneHeight);
    }
}

function moveStone() {
    for (var i = 0; i < stoneXArray.length; i++) {
        stoneXArray[i] -= 10 + level;
        if (stoneXArray[i] <= -100) {
            stoneXArray.splice(i, 1);
            stoneCounter--;
        }
    }
}

function stonePlayerCollision() {
    for (var i = 0; i < stoneXArray.length; i++) {
        if (playerX < stoneXArray[i] + stoneWidth &&
            playerX + playerWidth > stoneXArray[i] &&
            playerY < stoneY + stoneHeight &&
            playerHeight + playerY > stoneY) {
            hitDetected();
        }
    }
}
