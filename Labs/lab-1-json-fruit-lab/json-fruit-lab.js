"use strict";

const mainCanvas = document.getElementById("mainCanvas");
const context = mainCanvas.getContext("2d");

context.fillStyle = "blue";
context.fillRect(1, mainCanvas.height / 2, 20, 30)

var fruits = [
    {"name" : "Apple", "quantity" : 20, "color" : "red"},
    {"name" : "Orange", "quantity" : 10, "color" : "orange"},
    {"name" : "Banana", "quantity" : 15, "color" : "yellow"},
    {"name" : "Kiwi", "quantity" : 5, "color" : "brown"},
    {"name" : "Blueberry", "quantity" : 5, "color" : "blue"},
    {"name" : "Grapes", "quantity" : 10, "color" : "purple"}
]

var barHeight = mainCanvas.height / fruits.length;
var y = 1;

for (var i = 0; i < fruits.length; i++) {
    context.fillStyle = fruits[i]["color"];
    context.fillRect(1, y, fruits[i]["quantity"] * 25, barHeight);
    context.fillStyle = "black";
    context.font = "20px Verdana";
    context.fillText(fruits[i]["quantity"], 10, y + (barHeight / 2));
    context.fillText(fruits[i]["name"], 10, y + (barHeight / 2) + 20 );
    y += barHeight;
}
