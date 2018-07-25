//----------------------------
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "50px arial";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, cw / 2, 80);
}

function changeScoreByTime() {
    score += 10;
}

function changeScoreByEvent() {
    score += 100;
}


