
const canvas = document.querySelector('canvas');

// Get the 2D context
const c = canvas.getContext("2d");


for (var i = 0; i < 100; i++) {
    ctx.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
    ctx.fillRect(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), 10, 10);
  console.log("i: " + i);
}

function draw() {
    ctx.fillStyle = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
    ctx.fillRect(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), 10, 10);
    console.log("draw");
 }
