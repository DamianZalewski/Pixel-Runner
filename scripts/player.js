// draw player character and his animation
function drawPlayer() {
    switch (playerAnimationStage) {
        case 0:
            ctx.drawImage(playerImage1, playerX, playerY, playerWidth, playerHeight);
            break;
        case 1:
            ctx.drawImage(playerImage2, playerX, playerY, playerWidth, playerHeight);
            break;
        case 2:
            ctx.drawImage(playerImage3, playerX, playerY, playerWidth, playerHeight);
            break;
        case 3:
            ctx.drawImage(playerImage2, playerX, playerY, playerWidth, playerHeight);
            break;
    }
    if (playerAnimationTimer == 5) {
        playerAnimationStage++;
        playerAnimationTimer = 0;
    }
    if (playerAnimationStage > 3) playerAnimationStage = 0;
}

function hitDetected() {
    if (playerLifes == 0) {
        changeGameState(3);
    } else {
        if (mortal) {
            playerLifes--;
            mortal = false;
            setTimeout(switchMortal, 3000);
        }

    }
}

function switchMortal() {
    mortal = true;
}

function jumpStart() {
    if (jumpHigh < 300) jumpHigh += 10;
    document.addEventListener("keyup", jumpTrue, false);

}

function jumpTrue() {
    jump = true;
    document.removeEventListener("keyup", jumpTrue, false);
}

function jumpHandler() {
    if (jump) {
        if (jumpCounter <= jumpHigh && !jumpFall) {
            jumpCounter += jumpSpeed;
            playerY -= jumpSpeed;

        } else
        if (jumpCounter <= 0) {
            jumpFall = false;
            jump = false;
            jumpCounter = 0;
            jumpHigh = 100;
            jumpSpeed = 10;
        } else {
            jumpFall = true;
            jumpCounter -= jumpSpeed;
            playerY += jumpSpeed;

        }


    }

}

function drawlifes() {
    // 1.show how many lifes player have
    for (var i = 0; i < playerLifes; i++) {
        ctx.drawImage(playerLifesImage, playerLifeX + playerLifeSpace * i, playerLifeY, playerLifeWidth, playerLifeHeight);
    }
}


