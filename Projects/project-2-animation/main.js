"use strict";

// Note canvas size is 1200x1000 pixels.

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

// Get all the random x, and y coordinates for the trees, stars, and planets.
const treeCoordinates = [];
const treeSizes = [[]];
const maxTreeHeight = 70;
const maxTreeWidth = 7;
for (var i = 1; i < mainCanvas.width; i += Math.floor((Math.random() * 6)))  {
    treeCoordinates.push(i);
    var treeWidth = Math.floor(Math.random() * maxTreeWidth);
    var treeHeight = Math.floor(Math.random() * maxTreeHeight);
    treeSizes.push([treeWidth, treeHeight]);
}

const numOfStars = 2000;
const starCoordinates = [[]];
for (var star = 1; star <= numOfStars; star++) {
    var x = Math.floor(Math.random() * mainCanvas.width);
    var y = Math.floor(Math.random() * mainCanvas.height / 2);
    starCoordinates.push([x, y]);
}

const numOfPlanets = 5;
const planetCoordinates = [[]];
const planetRadii = []
for (var planet = 1; planet <= numOfPlanets; planet++) {
    var x = Math.floor(Math.random() * mainCanvas.width);
    var y = Math.floor(Math.random() * mainCanvas.height / 2);
    planetCoordinates.push([x, y]);

    var r = Math.floor(Math.random() * 10);
    planetRadii.push(r);
}


// Static element functions start.

// Draw the moon and a few planets at random positions in the sky.
function drawMoon(x, y, radius) {

    for (var i = 0; i < numOfPlanets; i++) {
        var x2 = planetCoordinates[i][0];
        var y2 = planetCoordinates[i][1];
        var r = planetRadii[i];
        context.beginPath();
        context.arc(x2, y2, r, 0, 2 * Math.PI);
        context.fillStyle = "White";
        context.fill();
    }

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = "gray";
    context.fill();
}

// Randomly draws a specified number of stars.
function drawStars() {
    context.fillStyle = "#0000ff";
    for (var i = 0; i < starCoordinates.length; i++) {
        var x = starCoordinates[i][0];
        var y = starCoordinates[i][1];
        context.fillRect(x, y, 2, 2);
    }
}

// Draw the ground.
function drawGround() {
    context.fillStyle = "#2b180c";
    context.fillRect(1, mainCanvas.height / 2, mainCanvas.width, mainCanvas.height / 4);
}

// Draw a cabin.
function drawCabin(x, y, height, width) {

    // Draw cabin body.
    context.fillStyle = "#483131";
    context.fillRect(x, y, width, height);

    // Draw the logs that make up the cabin walls.
    var logHeight = 15;
    context.lineWidth = 2;
    context.beginPath();
    for (var i = height + y; i >= y; i -= logHeight) {
        context.moveTo(x, i);
        context.lineTo(x + width, i);
    }
    context.strokeStyle = "#000000";
    context.stroke();

    // Draw a window.
    context.fillStyle = "#FFBF00";
    context.fillRect(x + width / 4, y + height / 4, width / 2, height / 2);
    
    // Draw the window frame.
    context.beginPath();
    context.strokeStyle = "#000000";
    context.lineWidth = 2;
    context.strokeRect(x + width / 4, y + height / 4, width / 2, height / 2);
    context.lineWidth = 2;
    context.moveTo(x + width / 2, y + height / 4);
    context.lineTo(x + width / 2, y + (height / 4) * 3);
    context.moveTo(x + width / 4, y + height / 2);
    context.lineTo(x + (width / 4) * 3, y + height / 2);
    context.stroke();

    // Draw the roof.
    context.fillStyle = "#808080";
    context.beginPath();
    context.moveTo(x - (width * 0.1), y);
    context.lineTo(x + (width + (width * 0.1)) / 2, y * 0.95);
    context.lineTo(x + width + (width * 0.1), y);
    context.closePath();
    context.fill();

    context.fillStyle = "#000000";
}



function drawDistantForest() {

    for (var i = 0; i < treeCoordinates.length; i++) {
        // Draw the tree trunk.
        var treeWidth = treeSizes[i][0]; 
        var treeHeight = treeSizes[i][1];
        context.fillStyle = "#261105";
        var y = mainCanvas.height / 2;
        var x = treeCoordinates[i]
        context.fillRect(x, y, treeWidth, -treeHeight);
        
        // Draw tree leaves.
        context.fillStyle = "#005000"
        y -= treeHeight * 0.66;
        var treeLeavesWidth = 3 * treeWidth;
        x = (x + (treeWidth / 2)) - (treeLeavesWidth / 2);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + (treeLeavesWidth / 2), y - treeHeight * 0.40);
        context.lineTo(x + treeLeavesWidth, y);
    
        for (var leafCluster = 0; leafCluster < 3; leafCluster++) {
            y -= treeHeight * 0.15;
            context.moveTo(x, y);
            context.lineTo(x + (treeLeavesWidth / 2), y - treeHeight * 0.40);
            context.lineTo(x + treeLeavesWidth, y);
        }
        context.fill();
    }
}

function drawTree(x, y, treeHeight, treeWidth) {
    context.fillStyle = "#261105";
    context.fillRect(x, y, treeWidth, -treeHeight);

    // Draw tree leaves.
    context.fillStyle = "#005000"
    y -= treeHeight * 0.66;
    var treeLeavesWidth = 3 * treeWidth;
    var x = (x + (treeWidth / 2)) - (treeLeavesWidth / 2);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + (treeLeavesWidth / 2), y - treeHeight * 0.40);
    context.lineTo(x + treeLeavesWidth, y);

    for (var leafCluster = 0; leafCluster < 5; leafCluster++) {
        y -= treeHeight * 0.15;
        context.moveTo(x, y);
        context.lineTo(x + (treeLeavesWidth / 2), y - treeHeight * 0.40);
        context.lineTo(x + treeLeavesWidth, y);
    }
    context.fill();
}

function drawPond() {
    context.beginPath();
    context.moveTo(mainCanvas.width - 500, mainCanvas.height * 0.75);
    context.quadraticCurveTo(300, 500, 800, 500);
    context.lineTo(mainCanvas.width, 500);
    context.lineTo(mainCanvas.width, mainCanvas.height * 0.75);
    context.closePath();
    context.fillStyle = "#008C96";
    context.fill();
}

function drawSign(x, y) {
    var signWidth = 120;
    var signHeight = 80;

    // Draw the stick supporting the sign.
    context.fillStyle = "black";
    context.fillRect(x + (signWidth / 2) - 4, y - 10, 8, 160);
    // Draw the sign board.
    context.fillStyle = "brown";
    context.fillRect(x, y, signWidth, signHeight);
    // Draw the text on the sign;
    context.fillStyle = "black";
    context.font = "15px Verdana";
    context.fillText("Welcome to", x + 5, y + signHeight / 2 - 15)
    context.fillText("Lake Side", x + 5, y + 15 + signHeight / 2 - 15)
    context.fillText("Camp Grounds", x + 5, y + 30 + signHeight / 2 - 15)
    // Draw nails.
    context.fillRect(x + (signWidth / 2) - 2, y + (signHeight * 0.12), 2, 2);
    context.fillRect(x + (signWidth / 2) - 2, y + (signHeight * 0.88), 2, 2);
}

function drawStaticElements() {
    drawGround();
    drawStars(1000);
    drawMoon(700, 100, 80);
    drawDistantForest();
    drawPond();
    drawTree(350, 550, 180, 15);
    drawTree(460, 540, 130, 20);
    drawCabin(200, 370, 200, 130);
    drawCabin(20, 364, 270, 170);
    drawSign(150, 600);
    var gradient = context.createLinearGradient(0, 0, mainCanvas.width, 0);
    context.fillStyle = gradient;
}
// Static element functions end.

// Animation functions
function drawAFrame(spriteSheet, frameX, frameY, spriteW, spriteH, scale, canvasX, canvasY) {
    context.drawImage(spriteSheet, frameX * spriteW, frameY * spriteH, spriteW, spriteH, 
                        canvasX, canvasY, spriteW * scale, spriteH * scale);
}

function init() {
    window.requestAnimationFrame(step);
}

function step() {
    
    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    drawStaticElements();

    // Campfire animation.
    drawAFrame(campfireImg, campfireSpriteLoc[campfireSpriteLocIndex], 0, campfireWidth, campfireHeight, campfireScale, 250, 530);
    drawAFrame(campfireImg, campfireSpriteLoc[campfireSpriteLocIndex], 0, campfireWidth, campfireHeight, campfireScale, 400, 500);
    campfireSpriteLocIndex++;
    if (campfireSpriteLocIndex >= campfireSpriteLoc.length) {
        campfireSpriteLocIndex = 0;
    }

    // White Owl animation.
    drawAFrame(whiteOwlImg, whiteOwlSpriteLoc[whiteOwlSpriteLocIndex], 0, whiteOwlWidth, whiteOwlHeight, whiteOwlScale, whiteOwlXPos, whiteOwlYPos);

    whiteOwlSpriteLocIndex++;
    
    if (whiteOwlGoingRight === true) {

        if (whiteOwlSpriteLocIndex >= whiteOwlSpriteLoc.length) {
        whiteOwlSpriteLocIndex = 3;
        }

        whiteOwlXPos += 1 * whiteOwlSpeed;
    }
    else {

        if (whiteOwlSpriteLocIndex >= whiteOwlSpriteLoc.length - 3) {
        whiteOwlSpriteLocIndex = 0;
        }

        whiteOwlXPos -= 1 * whiteOwlSpeed;
    }
    
    if (whiteOwlXPos >= mainCanvas.width + whiteOwlWidth) {
        whiteOwlGoingRight = false;
        whiteOwlYPos = Math.floor(Math.random() * mainCanvas.height / 3);
        whiteOwlSpeed = Math.floor(Math.random() * 50);
        whiteOwlScale = Math.random() * 2;
    }

    if (whiteOwlXPos <= -whiteOwlWidth) {
        whiteOwlGoingRight = true;
        whiteOwlYPos = Math.floor(Math.random() * mainCanvas.height / 3);
        whiteOwlSpeed = Math.floor(Math.random() * 50);
        whiteOwlScale = Math.random() * 2;
    }

    // Grey Owl animation.
    drawAFrame(greyOwlImg, greyOwlSpriteLoc[greyOwlSpriteLocIndex], 0, greyOwlWidth, greyOwlHeight, greyOwlScale, greyOwlXPos, greyOwlYPos);

    greyOwlSpriteLocIndex++;
    
    if (greyOwlGoingRight === true) {

        if (greyOwlSpriteLocIndex >= greyOwlSpriteLoc.length) {
        greyOwlSpriteLocIndex = 3;
        }

        greyOwlXPos += 1 * greyOwlSpeed;
    }
    else {

        if (greyOwlSpriteLocIndex >= greyOwlSpriteLoc.length - 3) {
        greyOwlSpriteLocIndex = 0;
        }

        greyOwlXPos -= 1 * greyOwlSpeed;
    }
    
    if (greyOwlXPos >= mainCanvas.width + greyOwlWidth) {
        greyOwlGoingRight = false;
        greyOwlYPos = Math.floor(Math.random() * mainCanvas.height / 3);
        greyOwlSpeed = Math.floor(Math.random() * 50);
        greyOwlScale = Math.random() * 2;
    }

    if (greyOwlXPos <= -greyOwlWidth) {
        greyOwlGoingRight = true;
        greyOwlYPos = Math.floor(Math.random() * mainCanvas.height / 3);
        greyOwlSpeed = Math.floor(Math.random() * 50);
        greyOwlScale = Math.random() * 2;
    }


    window.requestAnimationFrame(step);
}

// Campfire animation.
const campfireScale = 1.5;
const campfireWidth = 64;
const campfireHeight = 64;
const campfireSpriteLoc = [0, 1, 2, 3, 4];
let campfireSpriteLocIndex = 0;

let frameCount = 0;

let campfireImg = new Image();
campfireImg.src = 'Sprites/CampFireFinished.png';


// White Owl animation.
let whiteOwlScale = Math.random() * 2;
const whiteOwlWidth = 64;
const whiteOwlHeight = 64;

const whiteOwlSpriteLoc = [0, 1, 2, 6, 7, 8];
let whiteOwlSpriteLocIndex = 0;
let whiteOwlXPos = 0;
let whiteOwlYPos = Math.floor(Math.random() * mainCanvas.height / 3);
let whiteOwlGoingRight = true;
let whiteOwlSpeed = Math.floor(Math.random() * 50);

let whiteOwlImg = new Image();
whiteOwlImg.src = 'Sprites/whiteOwl.png';


// Grey Owl animation.
let greyOwlScale = Math.random() * 2;
const greyOwlWidth = 64;
const greyOwlHeight = 64;

const greyOwlSpriteLoc = [0, 1, 2, 6, 7, 8];
let greyOwlSpriteLocIndex = 0;
let greyOwlXPos = 0;
let greyOwlYPos = Math.floor(Math.random() * mainCanvas.height / 3);
let greyOwlGoingRight = true;
let greyOwlSpeed = Math.floor(Math.random() * 50);

let greyOwlImg = new Image();
greyOwlImg.src = 'Sprites/greyOwl.png';
greyOwlImg.onload = function() {
    init();
}
