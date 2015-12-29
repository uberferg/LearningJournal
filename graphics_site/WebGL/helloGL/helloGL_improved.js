// helloGL_improved.js

var gl;

function main() {
    var canvas = document.getElementById('gl-canvas');

    gl = initGLContext(canvas); // Initialize the GL canvas context

    // Only continue if WebGL is available
    if (gl) {
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}

function initGLContext(canvas) {
    gl = null;

    // try to retrieve the standard WebGL context,
    // using the experimental as a fallback.
    try {
        gl = canvas.getContext('webgl') || 
             canvas.getContext('experimental-webgl');
    } catch(e) {}

    // alert if creating the WebGL context failed
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it");
    }
    return gl;
}

function setupShaders() {
    // retrieve the shader scripts from the DOM
    var vertexShader = loadShaderFromDOM(gl, '2d-vShader');
    var fragmentShader = loadShaderFromDOM(gl, '2d-fShader');

    // create and link the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // alert if creating the shader program failed
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initalize the shader program.");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = 
            gl.getAttribLocation(shaderProgram, "aVertexPosition");
}

function loadShaderFromDOM(gl, id) {
}

function loadShader(gl, type, shaderSource) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Error compiling shader" + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function setupBuffers() {
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var triangleVertices = [
             0.0,   1.0,    0.0,
            -1.0,  -1.0,    0.0,
             1.0,  -1.0,    0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(triangleVertices),
                  gl.STATIC_DRAW);
    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 3;
}

function draw() {
    gl.viewport(0, 0, gl.viewPortWidth, gl.viewPortHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
                           vertexBuffer.itemSize,
                           gl.FLOAT,
                           false,
                           0,
                           0);
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}
