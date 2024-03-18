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

function drawCabin(context, x, y, height, width) {
  
    // Draw cabin body.
    context.fillStyle = "#483131"
    context.fillRect(x, y, width, height);

    // Draw the logs that make up the cabin walls.
    var logHeight = 15;
    context.beginPath();
    for (var i = height + y; i >= y; i -= logHeight) {
        context.moveTo(x, i);
        context.lineTo(x + width, i);
    }
    context.strokeStyle = "#FFFFFF";
    context.stroke();

    // Draw a window.
    context.fillStyle = "#FFBF00";
    context.fillRect(x + width / 4, y + height / 4, width / 2, height / 2);
    
    // Draw the window frame.
    context.beginPath();
    context.lineWidth = 4;
    context.strokeStyle = "#000000";
    context.strokeRect(x + width / 4, y + height / 4, width / 2, height / 2);
    context.lineWidth = 2;
    context.moveTo(x + width / 2, y + height / 4);
    context.lineTo(x + width / 2, y + (height / 4) * 3);
    context.moveTo(x + width / 4, y + height / 2);
    context.lineTo(x + (width / 4) * 3, y + height / 2);
    context.stroke();

    // Draw the roof.
    

}
drawRandomStars(context, 2000);
drawCabin(context, 250, 10, 200, 150);

