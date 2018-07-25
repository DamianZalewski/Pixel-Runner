function drawShot() {
    for (var i = 0; i < shotsXArray.length; i++) {


        switch (bulletAnimationStage) {
            case 0:
                ctx.drawImage(bulletImage, shotsXArray[i], shotsYArray[i], shotWidth, shotHeight);
                break;
            case 1:
                ctx.drawImage(bulletImage2, shotsXArray[i], shotsYArray[i], shotWidth, shotHeight);
                break;
            case 2:
                ctx.drawImage(bulletImage3, shotsXArray[i], shotsYArray[i], shotWidth, shotHeight);
                break;
        }
    }
    if (bulletAnimationTimer == 5) {
        bulletAnimationStage++;
        bulletAnimationTimer = 0;
    }
    if (bulletAnimationStage > 2) bulletAnimationStage = 0;
}



function drawAmmo() {
    for (var i = 0; i < shotAmmo; i++) {
        ctx.drawImage(bulletImage, bulletX - i * bulletWidth / 2, bulletY, bulletWidth, bulletHeight);
    }

}


function shotMove() {
    for (var i = 0; i < shotsXArray.length; i++) {
        shotsXArray[i] += 10 + level;
        if (shotsXArray[i] > cw) {
            shotsXArray.splice(i, 1);
            shotsYArray.splice(i, 1);
            shotCounter--;
        }
    }
}

function shot() {
    if (shotAmmo != 0) {
        shotAmmo--;
        shotY = playerY + playerHeight / 2;
        shotsXArray[shotCounter] = (playerX + playerWidth);
        shotsYArray[shotCounter] = (shotY);
        shotCounter++;
    }
}


function reloadAmmo() {
    if (shotAmmo < 5) {
        shotAmmo++;
    }
}

