"use strict";

// Note canvas size is 1100x1100 pixels.

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

// Functions start.
function drawWindow(canvas, x, y, radius) {
    context.fillStyle = "white";
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.rect(mainCanvas.width, 0, -mainCanvas.width, mainCanvas.height);
    context.fill();
}

function drawMoon(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = "gray";
    context.fill();

    for (var i = 0; i < 5; i++) {
        var x2 = Math.floor(Math.random() * (x));
        var y2 = Math.floor(Math.random() * (y + 400));
        var r = Math.floor(Math.random() * 10);
        context.beginPath();
        context.arc(x2, y2, r, 0, 2 * Math.PI);
        context.fillStyle = "White";
        context.fill();
    }
}

function drawStars(context, numOfStars) {
    context.fillStyle = "#0000ff";
    for (var i = 0; i < numOfStars; i++) {
        var x = Math.floor(Math.random() * mainCanvas.width);
        var y = Math.floor(Math.random() * mainCanvas.height / 2);
        context.fillRect(x, y, 2, 2);
    }
}

function drawGround(context) {
    context.fillStyle = "black";
    context.fillRect(1, mainCanvas.height / 2, mainCanvas.width, mainCanvas.height / 4);
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

function drawCampFire() {}

function drawDistantForest() {}

function drawLake() {}

// Functions end.

drawGround(context);
drawStars(context, 1000);
drawMoon(context,  700, 100, 80);
drawCabin(context, 100, 370, 200, 100);
drawCabin(context, 10, 400, 250, 150);
// drawWindow(context, 550, 550, 500);

var gradient = context.createLinearGradient(0, 0, mainCanvas.width, 0);
gradient.addColorStop("0", "red");
gradient.addColorStop("0.5", "white");
context.fillStyle = gradient;
context.font = "30px Verdana";
context.fillText("Camp Site", 20, 40);