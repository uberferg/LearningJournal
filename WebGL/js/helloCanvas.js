// helloCanvas.js

function main() {
    // First, we retrieve the canvas element.
    var canvas = document.getElementById('hello-canvas');
    if (!canvas) {
      console.log('Failed to retrieve the <canvas> element.');
      return;
    }

    // Next, we need a rendering context for the canvas.
    // In this example, we're using a basic 2d context.
    var ctx = canvas.getContext('2d');

    // Now, we can use the canvas API to draw something
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.fillRect(50, 100, 250, 150);

    ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.rect(200, 150, 200, 200);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.arc(250, 200, 180, 0, 2*Math.PI);
    ctx.stroke();

    ctx.font = '64px sans';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#ee7f2d';
    ctx.strokeText("Hello, canvas!", 30, 470);
    ctx.fillText("Hello, canvas!", 30, 470);

}
