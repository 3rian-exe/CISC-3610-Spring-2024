"use strict";

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

context.fillStyle = "#ff0000";
context.fillRect(50, 10, 100, 100);

context.fillStyle = "#00ff00";
context.fillRect(50, 100, 100, 100);

function drawRandomStars(context, numOfStars) {
  context.fillStyle = "#0000ff";
  for (var i = 0; i < numOfStars; i++) {
    var x = Math.floor(Math.random() * mainCanvas.width);
    var y = Math.floor(Math.random() * mainCanvas.height / 2);
    context.fillRect(x, y, 1, 1);
  }
}

function drawBuilding(context, x, y, height, width) {
  
}

drawRandomStars(context, 2000);

