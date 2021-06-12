// Get the canvas and context
let canvas = document.querySelector('#c1');
let context = canvas.getContext("2d");

/* Set the brush colors
 We can use any CSS color value for these */
context.strokeStyle = "#fff";
context.fillStyle = "goldenrod";

/* Draw a rectangle
args =  top, left, bottom, right*/
context.fillRect(110, 200, 100, 100);
context.strokeRect(110, 200, 100, 100);

/* Draw a rectangle with a pattern as the fillStyle
The current image is far too big for this small canvas area.
I'll use gradient instead. */
function drawPattern() {
  var canvas = document.getElementById("c1");
  var context = canvas.getContext("2d");
  context.strokeStyle = "red";

  // var img = new Image();
  // // img.src = "../images/dogs/labrador.jpg";
  // img.onload = function () {
  //   var pattern = context.createPattern(img, "repeat");
  //   context.fillStyle = pattern;
  //   context.fillRect(10, 10, 490,200);
  // }

  var gradient = context.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(0.6, "goldenrod");
  gradient.addColorStop(1, "goldenrod");
  context.fillStyle = gradient;
  context.fillRect(10, 10, 280, 100);
  context.strokeRect(10, 10, 280, 100);
}

drawPattern();

const clearCanvas = () => {
  var canvas = document.getElementById("c1");
   canvas.width = canvas.width;
}

