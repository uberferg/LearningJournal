// canvasClock.js
var clockFace;

function main() {
    // First, we retrieve the canvas element and its 2d context
    var canvas = document.getElementById('clock-canvas');
    if (!canvas) {
      console.log('could not retrieve <canvas> element');
    }
    var ctx = canvas.getContext('2d');

    // next, we shift the origin to the center of the canvas
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);

    // preload the clock face background image
    clockFace = new Image();
    clockFace.src = 'images/wood_texture.jpg';

    // last, we set the clock radius and draw the clock
    var clockRad = radius*0.9;
    setInterval(function() { drawClock(ctx, clockRad); }, 1000);
}

// draws a clock of radius r on a 2d canvas drawing object ctx
function drawClock(ctx2, r) {
    drawFace(ctx2, r);
    drawNumbers2(ctx2, r);
    drawTime(ctx2, r)
}

// draws the clock face
function drawFace(ctx, r) {
    // clear the clock face from the last iteration
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2*Math.PI);
    woodPattern = ctx.createPattern(clockFace, 'repeat');
    ctx.fillStyle = woodPattern;
    ctx.fill();
    
    // create a gradient for the clock rim
    var grad = ctx.createRadialGradient(0, 0, r*0.95, 0, 0, r*1.05);
    grad.addColorStop(0, '#000000');
    grad.addColorStop(0.05, '#c4982a');
    grad.addColorStop(0.5, '#ffd253');
    grad.addColorStop(0.95, '#c4982a');
    grad.addColorStop(1, '#000000');

    // set the stroke style to the gradient and draw the clock rim
    ctx.strokeStyle = grad;
    ctx.lineWidth = r*0.1;
    ctx.stroke();
}

// draws the clock numbers
function drawNumbers(ctx, r) {
    var theta = Math.PI/6;
    var num;
    var numRad = r*0.75

    // set the font size, style, baseline, and alignment
    ctx.font = r*0.20 + 'px Libre Baskerville';
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#c4982a';
    ctx.lineWidth = 1;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // draw the numbers
    for (num = 1; num < 13; num++) {
        var x = numRad * Math.sin(theta);
        var y = -numRad * Math.cos(theta);
        ctx.fillText(num.toString(), x, y);
        ctx.strokeText(num.toString(), x, y);
        theta += Math.PI/6;
    }
}

// an alternate function that uses canvas manipulations
// to determine the location and orientation of the numbers
function drawNumbers2(ctx, r) {
    var theta;
    var num;
    var numRad = r*0.8;
    
    // set the font size, style, baseline, and alignment
    ctx.font = r*0.20 + 'px Libre Baskerville';
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#c4982a';
    ctx.lineWidth = 1;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // draw the numbers
    for (num = 1; num < 13; num++) {
        theta = num * Math.PI/6;

        // rotate and translate to the print position,
        // then rotate back to print the number upright
        ctx.rotate(theta);
        ctx.translate(0, -numRad);
        ctx.rotate(-theta);
        ctx.fillText(num.toString(), 0, 0);
        ctx.strokeText(num.toString(), 0, 0);
        ctx.rotate(theta);
        ctx.translate(0, numRad);
        ctx.rotate(-theta);
    }
}

// draws the clock hands and center
function drawTime(ctx, r) {
    console.log('drawing time');

    ctx.strokeStyle = '#000000';
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // draw the second hand
    second = second*Math.PI/30;
    drawHand(ctx, second, r*0.8, r*0.02);

    // draw the minute hand
    minute = (minute*Math.PI/30) + (second/60);
    drawHand(ctx, minute, r*0.75, r*0.05);

    // draw the hour hand
    hour = hour%12;
    hour = (hour*Math.PI/6) + (minute/12);
    drawHand(ctx, hour, r*0.6, r*0.07);
  
    // draw the clock center
    var grad2 = ctx.createRadialGradient(0, 0, 0, 0, 0, r*0.1);
    grad2.addColorStop(0, '#ffd253');
    grad2.addColorStop(0.9, '#c4982a');
    grad2.addColorStop(1, '#000000');
    ctx.beginPath();
    ctx.arc(0, 0, r*0.1, 0, 2*Math.PI);
    ctx.fillStyle = grad2;
    ctx.fill();

    function drawHand(ctx, theta, length, width) {
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.rotate(theta);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-theta);
    }
}
