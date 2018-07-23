//-----------------------------

function tryBird() {
    if ((Math.floor(Math.random() * 200) + 1) == 1) {

        birdXArray[birdsCounter] = cw + 50 + birdWidth;
        birdYArray[birdsCounter] = floorY - Math.floor(Math.random() * 100 + 100);
        birdsCounter++;
    }
}

function drawBird() {
    for (var i = 0; i < birdXArray.length; i++) {
        ctx.drawImage(birdImage, birdXArray[i], birdYArray[i], birdWidth, birdHeight);
    }
}

function moveBird() {
    for (var i = 0; i < birdXArray.length; i++) {
        birdXArray[i] -= 15 + level;
        if (birdXArray[i] <= -100) {
            birdXArray.splice(i, 1);
            birdYArray.splice(i, 1);
            birdsCounter--;
        }
    }
}
//-----------------------------------------------------
function birdSwing() {
    if (swingCounter > 8) swingBool = !swingBool;
    else if (swingCounter < -8) swingBool = !swingBool;
    if (swingBool) swingCounter++
        else swingCounter--;
    for (var i = 0; i < birdsCounter; i++) {
        birdYArray[i] += swingCounter;
    }
}
//-----------------------------------------------------
function birdPlayerCollision() {
    for (var i = 0; i < birdXArray.length; i++) {
        if (playerX < birdXArray[i] + birdWidth &&
            playerX + playerWidth > birdXArray[i] &&
            playerY < birdYArray[i] + birdHeight &&
            playerHeight + playerY > birdYArray[i]) {
            hitDetected();
        }
    }
}

function birdBulletCollision() {
    for (var i = 0; i < shotsXArray.length; i++) {
        for (var j = 0; j < birdXArray.length; j++) {
            if (shotsXArray[i] < birdXArray[j] + birdWidth &&
                shotsXArray[i] + shotWidth > birdXArray[j] &&
                shotsYArray[i] < birdYArray[j] + birdHeight &&
                shotHeight + shotsYArray[i] > birdYArray[j]) {
                //destroy bird and bullet
                birdXArray[j] = -100;
                shotsXArray[i] = cw;
                changeScoreByEvent();
            }
        }
    }
}

//-----------------------------
