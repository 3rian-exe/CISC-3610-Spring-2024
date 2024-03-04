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

}

function drawBuilding(context, x, y, length, width, buildingColor, windowColor) {
    
}
// Functions end.


drawMoon(context, 1350, 110)