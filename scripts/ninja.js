//-----------------------------
// ninja functions
function tryNinja() {
    if ((Math.floor(Math.random() * 200) + 1) == 1) {
        ninjaXArray[ninjaCounter] = cw + ninjaWidth;

        ninjaCounter++;
    }
}

function drawNinja() {
    for (var i = 0; i < ninjaXArray.length; i++) {


        switch (ninjaAnimationStage) {
            case 0:
                ctx.drawImage(ninjaImage1, ninjaXArray[i], ninjaY, ninjaWidth, ninjaHeight);
                break;
            case 1:
                ctx.drawImage(ninjaImage2, ninjaXArray[i], ninjaY, ninjaWidth, ninjaHeight);
                break;
            case 2:
                ctx.drawImage(ninjaImage3, ninjaXArray[i], ninjaY, ninjaWidth, ninjaHeight);
                break;
        }
    }
    if (ninjaAnimationTimer == 3) {
        ninjaAnimationStage++;
        ninjaAnimationTimer = 0;
    }
    if (ninjaAnimationStage > 2) ninjaAnimationStage = 0;

}

function moveNinja() {
    for (var i = 0; i < ninjaXArray.length; i++) {
        ninjaXArray[i] -= 25;
        if (ninjaXArray[i] <= -100) {
            ninjaXArray.splice(i, 1);
            ninjaCounter--;
        }
    }
}

function ninjaPlayerCollision() {
    for (var i = 0; i < ninjaXArray.length; i++) {
        if (playerX < ninjaXArray[i] + ninjaWidth &&
            playerX + playerWidth > ninjaXArray[i] &&
            playerY < ninjaY + ninjaHeight &&
            playerHeight + playerY > ninjaY) {
            hitDetected();
        }
    }
}

function ninjaBulletCollision() {
    for (var i = 0; i < shotsXArray.length; i++) {
        for (var j = 0; j < ninjaXArray.length; j++) {
            if (shotsXArray[i] < ninjaXArray[j] + ninjaWidth &&
                shotsXArray[i] + shotWidth > ninjaXArray[j] &&
                shotsYArray[i] < ninjaY + ninjaHeight &&
                shotHeight + shotsYArray[i] > ninjaY) {
                //destroy ninja and bullet
                ninjaXArray[j] = -100;
                shotsXArray[i] = cw;
                changeScoreByEvent();
            }
        }
    }
}
//-----------------------------