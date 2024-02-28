"use strict";

const canvas = document.getElementById("mainCanvas");
const context = canvas.getContext("2d");

context.fillStyle = "yellow";
context.fillRect(20, 20, 20, 10);
context.fillRect(20, 320, 20, 10);
context.fillRect(460, 20, 20, 10);
context.fillRect(460, 320, 20, 10);



context.beginPath();
context.moveTo(250, 175);
context.lineTo(50, 50);
context.lineTo(450, 300);
context.lineTo(450, 50);
context.lineTo(50, 300);
context.lineTo(50, 50);
context.strokeStyle = "black";
context.stroke();

drawHouse(context, 0.5);

function drawHouse(context, offset) {
    // Draw top half triangle.
    context.moveTo(250 + offset, 10 + offset);
    context.lineTo(10 + offset, 60 + offset);
    context.lineTo(490 + offset, 60 + offset);
    context.lineTo(250 + offset, 10 + offset);
    context.strokeStyle = "green";
    context.stroke();
}
