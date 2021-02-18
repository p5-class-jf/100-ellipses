// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    N: 1000,
    Method: 3,
    Random_Seed: 0,
    Download_Image: () => save(),
}
gui.add(params, "N", 0, 3000, 1)
gui.add(params, "Method", 0, 4, 1)
gui.add(params, "Random_Seed", 0, 100, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    randomSeed(params.Random_Seed)
    background(0)
    noStroke()
    fill(255, 30)
    // 0 : Half in a small rectangle and half in the whole canvas
    if (params.Method === 0) {
        for (let i = 0; i < params.N / 2; i++) {
            ellipse(random(width*0.25, width*0.75), random(height*0.25, height*0.75), random(50, 100))
        }
        for (let i = 0; i < params.N / 2; i++) {
            ellipse(random(width), random(height), random(50, 100))
        }
    }
    // 1 : Half in a small disk and half in a big disk
    else if (params.Method === 1) {
        translate(width/2, height/2)
        for (let i = 0; i < params.N / 2; i++) {
            const R = random(height*0.4)
            const angle = random(TAU)
            ellipse(R * cos(angle), R * sin(angle), random(50, 100))
        }
        for (let i = 0; i < params.N / 2; i++) {
            const R = random(height / sqrt(2))
            const angle = random(TAU)
            ellipse(R * cos(angle), R * sin(angle), random(50, 100))
        }
    }
    // 2 : Gaussian random
    else if (params.Method === 2) {
        translate(width/2, height/2)
        for (let i = 0; i < params.N; i++) {
            const R = randomGaussian(0, height/4)
            const angle = random(TAU)
            ellipse(R * cos(angle), R * sin(angle), random(50, 100))
        }
    }
    // 3 : Rejection method
    else if (params.Method === 3) {
        translate(width/2, height/2)
        let i = 0
        while (i < params.N) {
            const p = new p5.Vector().set(random(-width/2, width/2), random(-height/2, height/2))
            const R = p.mag()
            if (random() < 1 - R / height * sqrt(2) * 1.05) {
                ellipse(p.x, p.y, random(50, 100))
                i++
            }
        }
    }
    // 4 : uniform random
    else {
        for (let i = 0; i < params.N; i++) {
            ellipse(random(width), random(height), random(50, 100))
        }
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}