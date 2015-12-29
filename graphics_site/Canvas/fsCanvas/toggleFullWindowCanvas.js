// toggleFullWindowCanvas.js

(function() {

var canvas,
    context,
    width,
    height;

init();

function init() {
    canvas = document.getElementById('toggleWindowCanvas');
    if (!canvas) {
        console.log('could not retrieve <canvas> element');
    }
    context = canvas.getContext('2d');

    width = canvas.width;
    height = canvas.height;
    context.translate(width/2, height/2);

    window.requestAnimationFrame(draw);
}

function draw() {
    context.clearRect(-width/2, -height/2, width, height);
    var time = new Date().getMilliseconds();
    var offset = Math.PI*time / 500;
    var r = Math.min(width/2, height/2) - 1;
    var theta = Math.PI/3;

    context.beginPath();
    context.arc(0, 0, r+.5, 0, 2*Math.PI);
    context.strokeStyle = '#000000';
    context.stroke();

    drawSlice(r, offset, 'rgb(255, 0, 0)');
    drawSlice(r, offset + theta, 'rgb(255, 255, 0)');
    drawSlice(r, offset + 2*theta, 'rgb(0, 255, 0)');
    drawSlice(r, offset + 3*theta, 'rgb(0, 255, 255)');
    drawSlice(r, offset + 4*theta, 'rgb(0, 0, 255)');
    drawSlice(r, offset + 5*theta, 'rgb(255, 0, 255)');

    window.requestAnimationFrame(draw);
}

function drawSlice(rad, angle, colorStr) {
    context.beginPath();
    context.arc(0, 0, rad, angle, angle+Math.PI/3);
    context.lineTo(0, 0);
    context.fillStyle = colorStr;
    context.fill();
}

})();
