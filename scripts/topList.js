
function topList(){
    drawTopList();
    document.addEventListener("keyup",topListController);
    document.addEventListener("click",topListController);
}

function topListController(ev){
    document.removeEventListener("keyup",topListController);
    document.removeEventListener("click",topListController);
    gameStage = 0;
}

function drawTopList(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("TOP LIST", cw / 2, 100);
    ctx.fillStyle = "red";
    ctx.fillText("--------------------------", cw / 2, 140);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    
    for(var i = 0;i<5;i++){
        if(localStorage.getItem(i) != 0) {
              let name = i;
              let score = localStorage.getItem(i);
              ctx.fillText("1. NAME : "+name+" " + "SCORE : "+score, cw / 2, 190+i*40);
        }else{
                ctx.fillText("2. NAME : -------   SCORE : -------", cw / 2, 190+i*40);
        }
    }
    ctx.fillText("Press any key to return", cw / 2, 450);
    
}

function checkTopList(score){
    checkTopListBool = false;
    var values = [0,0,0,0,0];
    
    for(var i = 0;i<5;i++){
        values[i] = localStorage.getItem(i);
    }
    
    if(score>values[4]){
        values[4] = score;
        gameStage = 7;
    }
    values.sort(function(a, b){return b-a});
        for(var i = 0;i<5;i++){
        localStorage.setItem(i,values[i]);
    }
    
    for(var i = 0;i<5;i++){
        console.log("localStorage "+localStorage.getItem(i));
        console.log("values "+values[i]);
    }
}



function drawPickName(){
    document.addEventListener("keyup", pickNameHandler);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);
    ctx.font = "50px arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", cw / 2, ch / 2 - 200);
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, cw / 2, ch / 2 - 150);
    
    ctx.fillStyle  = pickColor;
    ctx.fillText("NEW RECORD!", cw / 2, 350);
    switch(pickColor){
        case 'red': pickColor = 'orange';
            break;
        case 'orange' : pickColor = 'gray';
            break;
        case 'gray' : pickColor = 'yellow';
            break;
        case 'yellow' : pickColor = 'darkgray';
            break;
        case 'darkgray' : pickColor = 'white';
            break;
        case 'white' : pickColor = 'black';
            break;
        case 'black' : pickColor = "red";
            break;
    }

    var name = "";
    for(var i = 0;i<5;i++) name += playerName[i];
    
    ctx.fillStyle = "white";
    ctx.fillText(name, cw / 2, 450);

    ctx.fillStyle = "white";
    ctx.fillText("Type your name and press ENTER to continue...", cw / 2, 550);
}
