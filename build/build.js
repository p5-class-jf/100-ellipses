var gui = new dat.GUI();
var params = {
    N: 1000,
    Method: 3,
    Random_Seed: 0,
    Download_Image: function () { return save(); },
};
gui.add(params, "N", 0, 3000, 1);
gui.add(params, "Method", 0, 4, 1);
gui.add(params, "Random_Seed", 0, 100, 1);
gui.add(params, "Download_Image");
function draw() {
    randomSeed(params.Random_Seed);
    background(0);
    noStroke();
    fill(255, 30);
    if (params.Method === 0) {
        for (var i = 0; i < params.N / 2; i++) {
            ellipse(random(width * 0.25, width * 0.75), random(height * 0.25, height * 0.75), random(50, 100));
        }
        for (var i = 0; i < params.N / 2; i++) {
            ellipse(random(width), random(height), random(50, 100));
        }
    }
    else if (params.Method === 1) {
        translate(width / 2, height / 2);
        for (var i = 0; i < params.N / 2; i++) {
            var R = random(height * 0.4);
            var angle = random(TAU);
            ellipse(R * cos(angle), R * sin(angle), random(50, 100));
        }
        for (var i = 0; i < params.N / 2; i++) {
            var R = random(height / sqrt(2));
            var angle = random(TAU);
            ellipse(R * cos(angle), R * sin(angle), random(50, 100));
        }
    }
    else if (params.Method === 2) {
        translate(width / 2, height / 2);
        for (var i = 0; i < params.N; i++) {
            var R = randomGaussian(0, height / 4);
            var angle = random(TAU);
            ellipse(R * cos(angle), R * sin(angle), random(50, 100));
        }
    }
    else if (params.Method === 3) {
        translate(width / 2, height / 2);
        var i = 0;
        while (i < params.N) {
            var p = new p5.Vector().set(random(-width / 2, width / 2), random(-height / 2, height / 2));
            var R = p.mag();
            if (random() < 1 - R / height * sqrt(2) * 1.05) {
                ellipse(p.x, p.y, random(50, 100));
                i++;
            }
        }
    }
    else {
        for (var i = 0; i < params.N; i++) {
            ellipse(random(width), random(height), random(50, 100));
        }
    }
}
function setup() {
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map