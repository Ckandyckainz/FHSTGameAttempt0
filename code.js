// GitHub version

let mcan = document.getElementById("mcan");
mcan.width = window.innerWidth;
mcan.height = window.innerHeight;
let mctx = mcan.getContext("2d");
let frictionModifier = 0.9;
let yourAcceleration = 1;
let yourMaxSpeed = 10;
let yourStoneSpeed = 10;

let yourVelocity = [0, 0];
let yourPos = [200, 200];
let enemyVelocity = [0, 0];
let enemyPos = [500, 200];
let keysDown = [];

class Cat{
	constructor(id, name, mc, lc, ec, ec2, nc, cc, clc, tlknc, tfts1, tfts1l, tfts1s, tfts2, tfts2l, tfts2s, tftsSag, earAngle, earWidth, earLength, stripes, patches, mouthColoring, pawColoring, scars, textColor, textOutlineColor){
  	this.id = id;
  	this.name = name;
  	this.mc = mc;
    this.lc = lc;
    this.ec = ec;
    this.ec2 = ec2;
    this.nc = nc;
    this.cc = cc;
    this.clc = clc;
    this.tlknc = tlknc;
    this.tfts1 = tfts1;
    this.tfts1l = tfts1l;
    this.tfts1s = tfts1s;
    this.tfts2 = tfts2;
    this.tfts2l = tfts2l;
    this.tfts2s = tfts2s;
    this.tftsSag = tftsSag;
    this.earAngle = earAngle;
    this.earWidth = earWidth;
    this.earLength = earLength;
    this.stripes = stripes;
    this.patches = patches;
    this.mouthColoring = mouthColoring;
    this.pawColoring = pawColoring;
    this.scars = scars;
    this.textColor = textColor;
    this.textOutlineColor = textOutlineColor;
  }
}

class CatHeadFront{
  constructor(cat, x, y, r, lr, ud, smile, mouthOpen, eyesX, eyesY, eyesW, eyesH, pupilsX, pupilsY, pupilsW, pupilsH, eyelids, innerPupilsM, innerPupilsA, ec){
    this.cat = cat;
    this.x = v(x);
    this.y = v(y);
    this.r = v(r);
    this.smile = v(smile);
    this.mouthOpen = v(mouthOpen);
    this.eyes = {x: v(eyesX), y: v(eyesY), w: v(eyesW), h: v(eyesH)};
    this.pupils = {x: v(pupilsX), y: v(pupilsY), w: v(pupilsW), h: v(pupilsH)};
    this.eyelids = [];
    eyelids.forEach((item)=>{
      this.eyelids.push(v(item));
    });
    this.innerPupils = {m: v(innerPupilsM), a: v(innerPupilsA)};
    this.ec = v(ec);
    this.headAngle = {lr: v(lr), ud: v(ud)};
  }
  drawSelf(ctx, cw){
    let x = this.x.v*cw;
    let y = this.y.v*cw;
    let r = this.r.v*cw;
  	let nx = x+this.headAngle.lr.v*r/2;
    let ny = y+this.headAngle.ud.v*r/2;
	ctx.fillStyle = colorString(...this.cat.mc, 1);
    ctx.strokeStyle = colorString(...this.cat.lc, 1);
    ctx.lineWidth = r/10;
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fill();
    if (this.cat.stripes != false) {
        ctx.strokeStyle = colorString(...this.cat.stripes.c, 1);
        ctx.beginPath();
        ctx.moveTo(nx-r*0.35, ny-r*0.4);
        ctx.lineTo(nx-r*0.2, ny-r*0.65);
        ctx.lineTo(nx-r*0, ny-r*0.4);
        ctx.lineTo(nx-r*-0.2, ny-r*0.65);
    	if (this.cat.stripes.type != "N") {
      	    ctx.lineTo(nx-r*-0.35, ny-r*0.4);
        }
        ctx.stroke();
        ctx.strokeStyle = colorString(...this.cat.lc, 1);
    }
    for (let i=0; i<this.cat.tfts1; i++) {
      let isPatch = false;
      if (this.cat.patches != false) {
        ctx.fillStyle = colorString(...this.cat.mc, 1);
        this.cat.patches.ids.forEach((id)=>{
          if (id == i) {
            isPatch = true;
            ctx.fillStyle = colorString(...this.cat.patches.c, 1);
          }
        });
      }
    	ctx.beginPath();
      let a = Math.PI/-2+Math.PI*2*i/this.cat.tfts1;
      let px1 = x+Math.cos(a)*r;
      let py1 = y+Math.sin(a)*r;
      ctx.moveTo(px1, py1);
      let a2 = Math.PI/-2+Math.PI*2*(i+0.5)/this.cat.tfts1;
      let as = Math.sign(a2-Math.PI/2);
      let px = x+Math.cos(a2)*r*this.cat.tfts1l-this.headAngle.lr.v*r/8;
      let py = y+Math.sin(a2)*r*this.cat.tfts1l*this.cat.tfts1s-this.headAngle.ud.v*r/8-this.cat.tftsSag*r;
      ctx.lineTo(px, py);
      a = Math.PI/-2+Math.PI*2*(i+1)/this.cat.tfts1;
      let px2 = x+Math.cos(a)*r;
      let py2 = y+Math.sin(a)*r;
      ctx.lineTo(px2, py2);
      if (isPatch) {
        ctx.lineTo(nx+Math.cos(a2)*this.cat.patches.ir*r, ny+Math.sin(a2)*this.cat.patches.ir*r);
      }
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px, py);
      ctx.lineTo(px2, py2);
      ctx.stroke();
      if (this.cat.stripes != false) {
      	ctx.strokeStyle = colorString(...this.cat.stripes.c, 1);
        ctx.beginPath();
        ctx.moveTo(px+as*r/8, py);
        ctx.lineTo(nx+Math.cos(a2)*r*0.8, (py+ny+Math.sin(a2)*r*0.8)/2);
        ctx.stroke();
        ctx.strokeStyle = colorString(...this.cat.lc, 1);
      }
    }
    for (let i=0; i<2; i++) {
    	ctx.fillStyle = colorString(...this.cat.mc, 1);
    	ctx.lineWidth = r/10;
      ctx.beginPath();
      let ea = Math.PI/-2+this.cat.earAngle*(i*2-1);
      let a = ea-this.cat.earWidth;
      ctx.moveTo(x+Math.cos(a)*r*0.9, y+Math.sin(a)*r*0.9);
      ctx.lineTo(x+Math.cos(ea)*r*this.cat.earLength+this.headAngle.lr.v*r/4, y+Math.sin(ea)*r*this.cat.earLength+this.headAngle.ud.v*r/8);
      a = ea+this.cat.earWidth;
      ctx.lineTo(x+Math.cos(a)*r*0.9, y+Math.sin(a)*r*0.9);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#FF88FFFF";
      ctx.beginPath();
      a = ea-this.cat.earWidth*0.58;
      ctx.moveTo(x+Math.cos(a)*r*0.85, y+Math.sin(a)*r*0.85);
      ctx.lineTo(x+Math.cos(ea)*r*this.cat.earLength*0.82+this.headAngle.lr.v*r/4, y+Math.sin(ea)*r*this.cat.earLength*0.82+this.headAngle.ud.v*r/8);
      a = ea+this.cat.earWidth*0.58;
      ctx.lineTo(x+Math.cos(a)*r*0.85, y+Math.sin(a)*r*0.85);
      ctx.fill();
    }
    if (this.cat.mouthColoring) {
      ctx.fillStyle = colorString(...this.cat.cc, 1);
      ctx.strokeStyle = colorString(...this.cat.clc, 1);
    } else {
      ctx.fillStyle = colorString(...this.cat.mc, 1);
      ctx.strokeStyle = colorString(...this.cat.lc, 1);
    }
   	ctx.beginPath();
		ctx.arc(nx, ny+r*0.47, r*0.4, 0, 2*Math.PI);
		ctx.fill();
    for (let i=0; i<this.cat.tfts2; i++) {
      if (this.cat.mouthColoring) {
        ctx.fillStyle = colorString(...this.cat.cc, 1);
        ctx.strokeStyle = colorString(...this.cat.clc, 1);
      } else {
        ctx.fillStyle = colorString(...this.cat.mc, 1);
        ctx.strokeStyle = colorString(...this.cat.lc, 1);
      }
      let isPatch = false;
      if (this.cat.patches != false) {
        this.cat.patches.ids.forEach((id)=>{
          if (id == i+this.cat.tfts1) {
            isPatch = true;
            ctx.fillStyle = colorString(...this.cat.patches.c, 1);
          }
        });
      }
      ctx.lineWidth = r/15;
    	ctx.beginPath();
      let a = Math.PI/-4+Math.PI*1.5*i/this.cat.tfts2;
      let px1 = nx+Math.cos(a)*r*0.4;
      let py1 = ny+r*0.47+Math.sin(a)*r*0.4;
      ctx.moveTo(px1, py1);
      let a2 = Math.PI/-4+Math.PI*1.5*(i+0.5)/this.cat.tfts2;
      let px = nx+Math.cos(a2)*r*this.cat.tfts2l-this.headAngle.lr.v*r/8;
      let py = ny+r*0.47+Math.sin(a2)*r*this.cat.tfts2l*this.cat.tfts2s-this.headAngle.ud.v*r/8-this.cat.tftsSag*r/2;
      ctx.lineTo(px, py);
      a = Math.PI/-4+Math.PI*1.5*(i+1)/this.cat.tfts2;
      let px2 = nx+Math.cos(a)*r*0.4;
      let py2 = ny+r*0.47+Math.sin(a)*r*0.4;
      ctx.lineTo(px2, py2);
      if (isPatch) {
        ctx.lineTo(nx, ny+r*0.47);
      }
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px, py);
      ctx.lineTo(px2, py2);
      ctx.stroke();
    }
    ctx.fillStyle = colorString(...this.cat.lc, 1);
    ctx.beginPath();
    ctx.moveTo(nx-r*0.2, ny+r*0.17);
    ctx.lineTo(nx+r*0.2, ny+r*0.17);
    ctx.lineTo(nx, ny+r*0.47);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(nx, ny+r*0.665-(this.smile.v+this.mouthOpen.v/2)*r/8, r/4, Math.abs(this.smile.v)*r/8, 0, Math.PI*(Math.sign(this.smile.v)+3)/2, Math.PI*(Math.sign(this.smile.v)+5)/2);
    ctx.stroke();
    if (this.mouthOpen.v != 0) {
      ctx.beginPath();
      ctx.ellipse(nx, ny+r*0.665-(this.smile.v-this.mouthOpen.v)*r/8, r/5, Math.abs(this.smile.v)*r/10, 0, Math.PI*(Math.sign(this.smile.v)+3)/2, Math.PI*(Math.sign(this.smile.v)+5)/2);
      ctx.stroke();
    }
    ctx.lineWidth = r/25;
    ctx.beginPath();
    ctx.moveTo(nx, ny+r*0.43);
    ctx.lineTo(nx, ny+r*0.55+r/8-this.mouthOpen.v*r/16);
    ctx.stroke();
    for (let i=0; i<this.cat.scars.length/5; i++) {
      ctx.strokeStyle = colorString(this.cat.scars[i*5+5], 0, 0, 1);
      ctx.lineWidth = this.cat.scars[i*5]*r/8;
      ctx.beginPath();
      ctx.moveTo(nx+r*this.cat.scars[i*5+1], ny+r*this.cat.scars[i*5+2]);
      ctx.lineTo(nx+r*this.cat.scars[i*5+3], ny+r*this.cat.scars[i*5+4]);
      ctx.stroke();
    }
    for (let i=0; i<2; i++) {
      drawEye(ctx, this, nx-r*0.4+i*r*0.8, ny-r*0.1, r, i);
    }
	}
}

function drawEye(ctx, catHead, ex, ey, r, id){
    let xe = ex+catHead.eyes.x.v*r/8;
    let ye = ey+catHead.eyes.y.v*r/8;
    let r1 = r*0.3*catHead.eyes.w.v;
    let r2 = r*0.23*catHead.eyes.h.v;
    let px = ex+catHead.pupils.x.v*r/8;
    let py = ey+catHead.pupils.y.v*r/8;
    let gradient = ctx.createRadialGradient(px, py, 0, px, py, r2);
    gradient.addColorStop(0, colorString(...catHead.cat.ec, 1));
    let gec = [];
    for (let j=0; j<3; j++) {
      gec.push(catHead.cat.ec[j]*(1-catHead.ec.v)+catHead.cat.ec2[j]*catHead.ec.v);
    }
    gradient.addColorStop(1, colorString(...gec, 1));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(xe, ye, r1, r2, 0, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = "#000000FF";
    ctx.beginPath();
    ctx.ellipse(px, py, r*0.12*catHead.pupils.w.v, r*0.19*catHead.pupils.h.v, 0, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = colorString(...catHead.cat.tlknc, catHead.innerPupils.a.v);
    ctx.beginPath();
    ctx.ellipse(px, py, r*0.12*catHead.pupils.w.v*catHead.innerPupils.m.v, r*0.19*catHead.pupils.h.v*catHead.innerPupils.m.v, 0, 0, 2*Math.PI);
    ctx.fill();
    ctx.fillStyle = colorString(...catHead.cat.mc, 1);
    for (let j=0; j<2; j++) {
      ctx.beginPath();
      let a1 = (Math.PI*catHead.eyelids[j*2].v)%(Math.PI*2);
      let a2 = (Math.PI*catHead.eyelids[j*2+1].v)%(Math.PI*2);
      let a3 = a1;
      let a4 = a2;
      if (id == 1) {
        a3 = Math.PI*3-a2;
        a4 = Math.PI*3-a1;
      }
      ctx.ellipse(xe, ye, r1+1, r2+1, 0, a3, a4, false);
      ctx.fill();
    }
}

function colorString(r, g, b, a){
	let color = Math.floor(r*255)*256**3+Math.floor(g*255)*256**2+Math.floor(b*255)*256+Math.floor(a*255);
  return "#"+color.toString(16).padStart(8, "0");
}

function v(value){
  if (Array.isArray(value)) {
    //return new KeyFramedValue(value);
  } else {
    return {v: value};
  }
}

function drawCatFace(ctx, cw, cat, x, y, name, r, lookAtMouse){
    let pupilsX = 0;
    let pupilsY = 0;
    if (lookAtMouse) {
      pupilsX = (mousePos.x-x)/mcan.height;
      pupilsY = (mousePos.y-y)/mcan.height;
    }
    let face = new CatHeadFront(cat, x/cw, y/cw, r, 0, 0, 0.1, 0, 0, 0, 1, 1, pupilsX, pupilsY, 1, 1, [0, 0, 0, 0], 0, 0, 0);
    face.drawSelf(ctx, cw);
}

let cFlame = new Cat(0, "Flame", [0.1, 0.1, 0.1], [0.4, 0.2, 0], [0, 0, 1], [0, 0.8, 0.6], [0.4, 0.2, 0], [1, 1, 1], [0.6, 0.6, 0.6], [0, 1, 1], 9, 1.3, 0.75, 3, 0.8, 0.6, -0.1, Math.PI*0.21, Math.PI*0.15, 1.5, {type: "N", c: [1, 0.5, 0], lsn: 3, lsw: 0.1}, false, true, true, [], [1, 0.85, 0.7], [0, 0, 0.3]);

let cHemlock = new Cat(3, "Hemlock", [0.5, 0.5, 0.5], [0.4, 0.3, 0.2], [0, 0.9, 0.4], [0, 0.8, 0.6], [0.4, 0.2, 0], [1, 1, 1], [0.6, 0.6, 0.6], [0, 1, 1], 9, 1.3, 0.75, 3, 0.8, 0.6, -0.1, Math.PI*0.21, Math.PI*0.15, 1.5, {type: "N", c: [1, 0.6, 0], lsn: 3, lsw: 0.1}, {c: [1, 1, 1], ids: [2, 6], ir: 0.8, legPatchCount: 3, w1: 0.4, w2: 0.2, lpl: 0.6}, true, true, [], [1, 0.85, 0.7], [0, 0, 0.3]);

let playerStones = [];
for (let i=0; i<9; i++) {
    playerStones.push({x: 200, y: 200, angle: 0, targetX: undefined, targetY: undefined, angleVelocity: 0});
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

function keypress(event) {
  let hasKey = false;
  keysDown.forEach((key) => {
    if (key == event.key) {
      hasKey = true;
    }
  });
  if (!hasKey) {
    keysDown.push(event.key);
  }
}
document.addEventListener("keydown", keypress);

function keyup(event) {
  for (let i = 0; i < keysDown.length; i++) {
    if (keysDown[i] == event.key) {
      keysDown.splice(i, 1);
    }
  }
}
document.addEventListener("keyup", keyup);

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

function boundValue(n, min, max){
  if (n > min && n < max) {
    return n;
  }
  if (n < min) {
    return min;
  }
  return max;
}

function animationLoop(){
    for (let i=0; i<keysDown.length; i++) {
      let keyDown = keysDown[i];
      if (keyDown == "w") {
        yourVelocity[1] -= yourAcceleration;
      } else if (keyDown == "a") {
        yourVelocity[0] -= yourAcceleration;
      } else if (keyDown == "s") {
        yourVelocity[1] += yourAcceleration;
      } else if (keyDown == "d") {
        yourVelocity[0] += yourAcceleration;
      }
    }
    for (i=0; i<2; i++) {
      yourVelocity[i] = boundValue(yourVelocity[i], yourMaxSpeed*-1, yourMaxSpeed)*frictionModifier;
      yourPos[i] += yourVelocity[i];
      yourPos[i] = boundValue(yourPos[i], 40, mcan.height-40);
      enemyVelocity[i] = boundValue(enemyVelocity[i], yourMaxSpeed*-1, yourMaxSpeed)*frictionModifier;
      enemyPos[i] += enemyVelocity[i];
      enemyPos[i] = boundValue(enemyPos[i], 40, mcan.height-40);
    }
    for (let i=0; i<playerStones.length; i++) {
      let psi = playerStones[i];
        if (playerStones[i].targetX != undefined) {
            let targetAngle = Math.atan2(psi.targetY-psi.y, psi.targetX-psi.x);
            if (psi.angle-targetAngle > Math.PI) {
              targetAngle += Math.PI*2;
            } else if (targetAngle-psi.angle > Math.PI) {
              targetAngle -= Math.PI*2;
            }
            let angleChangeBy = (targetAngle-psi.angle)/10;
            playerStones[i].angleVelocity += boundValue(angleChangeBy, -0.01, 0.01);
            playerStones[i].angleVelocity = boundValue(psi.angleVelocity, -0.1, 0.1);
            playerStones[i].angle += psi.angleVelocity;
            playerStones[i].x += Math.cos(psi.angle)*yourStoneSpeed;
            playerStones[i].y += Math.sin(psi.angle)*yourStoneSpeed;
        }
        if (psi.x < enemyPos[0] && Math.abs(enemyPos[0]-psi.x) < 100) {
          enemyVelocity[0] += yourMaxSpeed/9;
        }
        if (psi.y < enemyPos[0] && Math.abs(enemyPos[1]-psi.y) < 100) {
          enemyVelocity[1] += yourMaxSpeed/9;
        }
        if (psi.x > enemyPos[0] && Math.abs(enemyPos[0]-psi.x) < 100) {
          enemyVelocity[0] -= yourMaxSpeed/9;
        }
        if (psi.y > enemyPos[0] && Math.abs(enemyPos[1]-psi.y) < 100) {
          enemyVelocity[1] -= yourMaxSpeed/9;
        }
    }
    mctx.fillStyle = "white";
    mctx.fillRect(0, 0, mcan.width, mcan.height);
    drawCatFace(mctx, mcan.width, cFlame, ...yourPos, "You", 0.03, true);
    drawCatFace(mctx, mcan.width, cHemlock, ...enemyPos, "Enemy", 0.03, false);
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