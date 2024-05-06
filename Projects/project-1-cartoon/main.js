"use strict";

// Note canvas size is 1200x1000 pixels.

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

// Functions start.

// Draw the moon and a few planets at random positions in the sky.
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

// Randomly draws a specified number of stars.
function drawStars(context, numOfStars) {
    context.fillStyle = "#0000ff";
    for (var i = 0; i < numOfStars; i++) {
        var x = Math.floor(Math.random() * mainCanvas.width);
        var y = Math.floor(Math.random() * mainCanvas.height / 2);
        context.fillRect(x, y, 2, 2);
    }
}

// Draw the ground.
function drawGround(context) {
    context.fillStyle = "#2b180c";
    context.fillRect(1, mainCanvas.height / 2, mainCanvas.width, mainCanvas.height / 4);
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
    context.beginPath();
    context.moveTo(x - (width * 0.1), y);
    context.lineTo(x + (width + (width * 0.1)) / 2, y * 0.95);
    context.lineTo(x + width + (width * 0.1), y);
    context.closePath();
    context.fill();

    context.fillStyle = "#000000";
}



function drawDistantForest(context) {
    var maxTreeHeight = 70;
    var maxTreeWidth = 7;
    for (var i = 1; i < mainCanvas.width; i += (Math.random() * 6)) {
        // Draw the tree trunk.
        var treeHeight = Math.floor(Math.random() * maxTreeHeight);
        var treeWidth = Math.floor(Math.random() * maxTreeWidth); 
        //var y = Math.floor(Math.random() * (mainCanvas.height / 2));
        var y = mainCanvas.height / 2;
        context.fillStyle = "#261105";
        context.fillRect(i, y, treeWidth, -treeHeight);
        
        // Draw tree leaves.
        context.fillStyle = "#005000"
        y -= treeHeight * 0.66;
        var treeLeavesWidth = 3 * treeWidth;
        var x = (i + (treeWidth / 2)) - (treeLeavesWidth / 2);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + (treeLeavesWidth / 2), y - treeHeight * 0.40);
        context.lineTo(x + treeLeavesWidth, y);
    
        for (var leafCluster = 0; leafCluster < 3; leafCluster++) {
            y -= treeHeight * 0.15;
            context.moveTo(x, y);
            context.lineTo(x + (treeLeavesWidth / 2), y - treeHeight * 0.40);
            context.lineTo(x + treeLeavesWidth, y);
        }
        context.fill();
    }
}

function drawPond(context) {
    context.beginPath();
    context.moveTo(mainCanvas.width - 500, mainCanvas.height * 0.75);
    context.quadraticCurveTo(300, 500, 800, 500);
    context.lineTo(mainCanvas.width, 500);
    context.lineTo(mainCanvas.width, mainCanvas.height * 0.75);
    context.closePath();
    context.fillStyle = "#008C96";
    context.fill();
}

function drawSign(context, x, y) {
    var signWidth = 120;
    var signHeight = 80;

    // Draw the stick supporting the sign.
    context.fillStyle = "black";
    context.fillRect(x + (signWidth / 2) - 4, y - 10, 8, 160);
    // Draw the sign board.
    context.fillStyle = "brown";
    context.fillRect(x, y, signWidth, signHeight);
    // Draw the text on the sign;
    context.fillStyle = "black";
    context.font = "15px Verdana";
    context.fillText("Welcome to", x + 5, y + signHeight / 2 - 15)
    context.fillText("Lake Side", x + 5, y + 15 + signHeight / 2 - 15)
    context.fillText("Camp Grounds", x + 5, y + 30 + signHeight / 2 - 15)
    // Draw nails.
    context.fillRect(x + (signWidth / 2) - 2, y + (signHeight * 0.12), 2, 2);
    context.fillRect(x + (signWidth / 2) - 2, y + (signHeight * 0.88), 2, 2);
}
// Functions end.

drawGround(context);
drawStars(context, 1000);
drawMoon(context,  700, 100, 80);
drawDistantForest(context);
drawCabin(context, 200, 370, 200, 100);
drawCabin(context, 40, 400, 250, 150);
drawPond(context);
drawSign(context, 150, 600);


var gradient = context.createLinearGradient(0, 0, mainCanvas.width, 0);
gradient.addColorStop("0", "red");
gradient.addColorStop("0.5", "white");
context.fillStyle = gradient;