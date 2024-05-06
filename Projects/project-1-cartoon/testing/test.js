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

drawRandomStars(context, 2000);
drawCabin(context, 250, 100, 200, 150);

var x = 700;
var y = 600;
var width = 200;
var height = 60;

context.fillStyle = "blue";

const triangle = new Path2D();
triangle.moveTo(x, y);
triangle.lineTo((x + (width) / 2), y * 0.96);
triangle.lineTo(x + width, y);
triangle.closePath();
context.fill(triangle);

