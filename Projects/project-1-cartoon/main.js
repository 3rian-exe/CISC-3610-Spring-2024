"use strict";

// Note canvas size is 1100x1100 pixels.

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

// Functions start.
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


function drawWindow(canvas, x, y, radius) {
    context.fillStyle = "white";
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.rect(mainCanvas.width, 0, -mainCanvas.width, mainCanvas.height);
    context.fill();
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

// Functions end.

drawGround(context);
drawStars(context, 1000);
drawMoon(context,  700, 100, 80);
// drawWindow(context, 550, 550, 500);

var gradient = context.createLinearGradient(0, 0, mainCanvas.width, 0);
gradient.addColorStop("0", "blue");
gradient.addColorStop("0.5", "black");
context.fillStyle = gradient;
context.font = "30px Verdana";
context.fillText("Place Holder", 20, 40);