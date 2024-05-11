"use strict";

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

context.fillStyle = "#ff0000";
context.fillRect(50, 10, 100, 100);

context.fillStyle = "#00ff00";
context.fillRect(50, 100, 100, 100);

let rdmStarLocations = [[]];
for (var star = 0; star < 2000; star++) {
  var x = Math.floor(Math.random() * mainCanvas.width);
  var y = Math.floor(Math.random() * mainCanvas.height / 2);
  rdmStarLocations.push([x, y]);
}


function drawRandomStars(context, numOfStars) {
  context.fillStyle = "#0000ff";
  for (var i = 0; i < numOfStars; i++) {  
    context.fillRect(rdmStarLocations[i][0], rdmStarLocations[i][1], 1, 1);
  }
}

// Draw a cabin.
function drawCabin(context, x, y, height, width) {
  
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
    const roofPath = new Path2D();
    roofPath.moveTo(x - (width * 0.1), y);
    roofPath.lineTo(x + width + (width * 0.1), y);
    roofPath.lineTo(x + width + (width * 0.1), y - (height * 0.2));
    roofPath.lineTo(x - (width * 0.1), y);
    roofPath.closePath();
    context.fill(roofPath);
    roofPath.lineWidth = 2;
    roofPath.closePath();

    context.fillStyle = "#000000";
}

// Draw canvas window. 
function drawWindow(context, x, y, radius) {
  context.fillStyle = "white";
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.rect(mainCanvas.width, 0, -mainCanvas.width, mainCanvas.height);
  context.fill();
}

function main(){
  drawRandomStars(context, 2000);
  drawCabin(context, 250, 100, 200, 150);
}

// Animation
let img = new Image();
img.src = '../Sprites/whiteOwl.png';
img.onload = function() {
  init();
};

const scale = 5;
const spriteWidth = 64;
const spriteHeight = 64;
const scaledSpriteW = spriteWidth * scale;
const scaledSpriteH = spriteHeight * scale;

function drawFrame(context, frameX, frameY, canvasX, canvasY) {
  context.drawImage(img, 
                    frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 
                    canvasX, canvasY, scaledSpriteW, scaledSpriteH);
}

function init() {
  
  // context.drawImage(img, 0, 0, spriteWidth, spriteHeight, 0, 0, scaledSpriteW, scaledSpriteH);
  // context.drawImage(img, spriteWidth, 0, spriteWidth, spriteHeight, scaledSpriteW, 0, scaledSpriteW, scaledSpriteH);
  // context.drawImage(img, spriteWidth * 2, 0, spriteWidth, spriteHeight, scaledSpriteW * 2, 0, scaledSpriteW, scaledSpriteH);

  // drawFrame(context, 0, 0, 0, 0);
  // drawFrame(context, 1, 0, scaledSpriteW, 0);
  // drawFrame(context, 0, 0, scaledSpriteW * 2, 0);
  // drawFrame(context, 2, 0, scaledSpriteW * 3, 0);
  
  
  window.requestAnimationFrame(step);
}


window.requestAnimationFrame(step);

const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;

function step() {
  
  frameCount++;
  if (frameCount < 15) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;

  context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  drawFrame(context, cycleLoop[currentLoopIndex], 0, 0, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= cycleLoop.length) {
    currentLoopIndex = 0;
  }
  main();
  window.requestAnimationFrame(step);
}

