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
  context.fillStyle = "#808080";
  context.fillRect(x, y, width, height);
  context.fillStyle = "#ffffff";

  // for (var i = y + 10; y < height - 10; i += 10) {
  //   for (var j = x + 10; j < width - 10; j += 10) {
  //     context.fillRect(i, y, width / 8, height / 4);
  //   }
  // }
  context.fillRect(260, 20, width / 16, height / 8);
}

drawRandomStars(context, 2000);
drawBuilding(context, 250, 10, 200, 150);

