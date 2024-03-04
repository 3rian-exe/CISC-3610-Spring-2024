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
    context.beginPath();

    let i 
    for (let i = 0; i < context.width; i++) {
        for (let j = 0; j < context.height / 4; j++) {
            var x = Math.random() * context.width;
            var y = Math.random() * context.height / 4;
            context.fillRect(x, y, 1, 1);
        }    
    }

    // context.fillRect(100, 100, 1, 1);
    // context.fillRect(200, 200, 1, 1);
    context.fillStyle = "white";
    context.fill();
}

function drawBuilding(context, x, y, length, width, buildingColor, windowColor) {
    
}
// Functions end.


drawMoon(context, 1350, 110);
drawStars(context);

var gradient = context.createLinearGradient(0, 0, mainCanvas.width, 0);
gradient.addColorStop("0", "white");
gradient.addColorStop("0.5", "red");
context.fillStyle = gradient;
context.font = "30px Verdana";
context.fillText("City Scape In Progress", 100, 200);