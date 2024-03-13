"use strict";

// Note canvas size is 1500x800 pixels.

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

// Functions start.
function drawMoon(context, x, y) {
    context.beginPath();
    context.arc(x, y, 100, 0, 2 * Math.PI);
    context.fillStyle = "gray";
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

function drawBuilding(context, x, y, height, width) {
    context.beginPath();
    

}
// Functions end.


drawMoon(context, 1350, 110);
drawStars(context, 1000);

var gradient = context.createLinearGradient(0, 0, mainCanvas.width, 0);
gradient.addColorStop("0", "white");
gradient.addColorStop("0.5", "red");
context.fillStyle = gradient;
context.font = "30px Verdana";
context.fillText("City Scape In Progress", 100, 200);