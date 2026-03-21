// GitHub version

let mcan = document.getElementById("mcan");
mcan.width = window.innerWidth;
mcan.height = window.innerHeight;
let mctx = mcan.getContext("2d");

let playerStones = [];
for (let i=0; i<9; i++) {
    playerStones.push({x: 200, y: 200, angle: 0, targetX: undefined, targetY: undefined});
}
let playerStoneGroupSize = 3;
let playerStoneGroupNestLayers = 2;
let mousePos = {x: 200, y: 200};
let playerStoneGroupNumber = "";
let timeSinceLastPlayerStoneGroupNumberSet = 0;
let playerStoneGroupNumberTimeout = 60;

mcan.addEventListener("mousemove", (event)=>{
    mousePos.x = event.x;
    mousePos.y = event.y;
});

mcan.addEventListener("click", ()=>{
    let startIndex = 0;
    let endIndex = playerStones.length;
    if (playerStoneGroupNumber.length == 1) {
        startIndex = playerStoneGroupNumber[0]*playerStoneGroupSize;
        endIndex = (playerStoneGroupNumber[0]*1+1)*playerStoneGroupSize;
    } else if (playerStoneGroupNumber.length == 2) {
        startIndex = playerStoneGroupNumber[0]*playerStoneGroupSize+1*playerStoneGroupNumber[1];
        endIndex = startIndex+1;
    }
    for (let i=startIndex; i<endIndex; i++) {
        let psi = playerStones[i];
        playerStones[i].targetX = mousePos.x;
        playerStones[i].targetY = mousePos.y;
        playerStones[i].angle = Math.atan2(psi.targetY-psi.y, psi.targetX-psi.x);
    }
});

document.addEventListener("keypress", (event)=>{
    if (event.key == " ") {
        playerStoneGroupNumber = "";
    } else if (event.key >= 1 && event.key <= playerStoneGroupSize && playerStoneGroupNumber.length < playerStoneGroupNestLayers) {
        playerStoneGroupNumber += ""+event.key-1;
        timeSinceLastPlayerStoneGroupNumberSet = 0;
    }
});

function drawStone(ctx, stone, length, width) {
    let x = stone.x;
    let y = stone.y;
    let angle = stone.angle;
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.moveTo(x+Math.cos(angle)*length, y+Math.sin(angle)*length);
    ctx.lineTo(x+Math.cos(angle+Math.PI/2)*width, y+Math.sin(angle+Math.PI/2)*width);
    ctx.lineTo(x+Math.cos(angle+Math.PI)*length, y+Math.sin(angle+Math.PI)*length);
    ctx.lineTo(x+Math.cos(angle+Math.PI*3/2)*width, y+Math.sin(angle+Math.PI*3/2)*width);
    ctx.fill();
}

function animationLoop(){
    for (let i=0; i<playerStones.length; i++) {
        if (playerStones[i].targetX != undefined) {
            let psi = playerStones[i];
            playerStones[i].x += Math.cos(psi.angle)*5;
            playerStones[i].y += Math.sin(psi.angle)*5;
            if (Math.abs(psi.targetX-psi.x+psi.targetY-psi.y) < 9) {
                playerStones[i].targetX = undefined;
            }
        }
    }
    mctx.fillStyle = "white";
    mctx.fillRect(0, 0, mcan.width, mcan.height);
    for (let i=0; i<playerStones.length; i++) {
        drawStone(mctx, playerStones[i], 20, 10);
    }
    timeSinceLastPlayerStoneGroupNumberSet ++;
    if (timeSinceLastPlayerStoneGroupNumberSet > playerStoneGroupNumberTimeout) {
        playerStoneGroupNumber = "";
    }
    requestAnimationFrame(animationLoop);
}
animationLoop();