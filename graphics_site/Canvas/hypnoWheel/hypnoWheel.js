// hypnoWheel.js

var canvas;
var context;
var offset = 0;

function setup() {
    // retrieve the canvas element and rendering context
    canvas = document.getElementById('hypno-canvas');
    if (!canvas) {
        console.log('could not retrieve <canvas> element')
    }
    context = canvas.getContext('2d');
    
    // translate origin to center of canvas
    context.translate(canvas.width/2, canvas.height/2);

    drawBackground();
    setInterval(animate, 20);
}

function drawBackground() {
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvas.width/2, -canvas.height/2);
    context.lineTo(0, -canvas.height/2);
    context.fill();

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvas.width/2, canvas.height/2);
    context.lineTo(canvas.width/2, 0);
    context.fill();
    
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(0, canvas.height/2);
    context.lineTo(-canvas.width/2, canvas.height/2);
    context.fill();

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(-canvas.width/2, 0);
    context.lineTo(-canvas.width/2, -canvas.height/2);
    context.fill();
}

function animate() {
    draw();
    offset++;
}

function draw() {
    w = 1;
    r = 5;
    while (r <= 200) {
        if (w%2 === 0) { drawRing(0, 0, r, r+w, 'white'); }
        else { drawRing(0, 0, r, r+w, 'black'); }
        r += w;
        w++;
    }
}

function drawRing(x, y, inner, outer, color) {
    ring = new Path2D();
    rad = (inner + outer) / 2;
    ring.arc(x, y, rad, 0, 2*Math.PI);
    context.lineWidth = outer - inner;
    context.lineDashOffset = offset;

    if (color === 'white') {
        context.setLineDash([1,0]);
        context.strokeStyle = '#fff';
        context.stroke(ring);
        context.setLineDash([Math.PI * rad / 12]);
        context.strokeStyle = '#000';
        context.stroke(ring);
    } else {
        context.setLineDash([1,0]);
        context.strokeStyle = '#000';
        context.stroke(ring);
        context.setLineDash([Math.PI * rad / 12]);
        context.strokeStyle = '#fff';
        context.stroke(ring);
    }
}
