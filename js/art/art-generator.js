
/* =========================================
   GENERATIVE ART PLAYGROUND
   ART GENERATION ENGINE
========================================= */

import { getArtStyle } from "./art-styles.js";


/* =========================================
   1. DEFAULT SETTINGS
========================================= */

const DEFAULT_ART_SETTINGS = {
    artStyle: "geometric",
    primaryColor: "#A78BFA",
    backgroundColor: "#FFFFFF",
    complexity: 5
};


/* =========================================
   2. RANDOM NUMBER GENERATOR
========================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInteger(min, max) {
    return Math.floor(random(min, max + 1));
}


/* =========================================
   3. COLOR UTILITIES
========================================= */

function getColorWithOpacity(color, opacity) {
    const hex = color.replace("#", "");

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}


/* =========================================
   4. CANVAS PREPARATION
========================================= */

export function createArtworkCanvas(container) {
    const canvas = document.createElement("canvas");

    canvas.width = 800;
    canvas.height = 450;

    canvas.className = "artwork-canvas";

    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.display = "block";

    container.replaceChildren(canvas);

    return canvas;
}


/* =========================================
   5. MAIN GENERATION FUNCTION
========================================= */

export function generateArtwork(canvas, settings = {}) {
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
        console.error("Canvas context unavailable.");
        return;
    }

    const options = {
        ...DEFAULT_ART_SETTINGS,
        ...settings
    };

    const width = canvas.width;
    const height = canvas.height;

    context.clearRect(0, 0, width, height);

    context.fillStyle = options.backgroundColor;
    context.fillRect(0, 0, width, height);

    switch (options.artStyle) {
        case "geometric":
            drawGeometric(context, width, height, options);
            break;

        case "waves":
            drawWaves(context, width, height, options);
            break;

        case "particles":
            drawParticles(context, width, height, options);
            break;

        case "patterns":
            drawPatterns(context, width, height, options);
            break;

        default:
            drawGeometric(context, width, height, options);
    }

    console.log("Artwork generated:", options.artStyle);
}


/* =========================================
   6. GEOMETRIC ART
========================================= */

function drawGeometric(context, width, height, settings) {
    const style = getArtStyle("geometric").settings;

    const count = settings.complexity * 8;

    for (let i = 0; i < count; i++) {
        const x = random(0, width);
        const y = random(0, height);

        const size = random(style.minSize, style.maxSize);
        const opacity = random(style.minOpacity, style.maxOpacity);

        context.fillStyle = getColorWithOpacity(
            settings.primaryColor,
            opacity
        );

        context.save();

        context.translate(x, y);
        context.rotate(random(0, Math.PI * 2));

        if (Math.random() > 0.5) {
            context.beginPath();
            context.arc(0, 0, size / 2, 0, Math.PI * 2);
            context.fill();
        } else {
            context.fillRect(
                -size / 2,
                -size / 2,
                size,
                size
            );
        }

        context.restore();
    }
}


/* =========================================
   7. WAVE ART
========================================= */

function drawWaves(context, width, height, settings) {
    const style = getArtStyle("waves").settings;

    const waveCount = settings.complexity * style.waveCountMultiplier;

    for (let i = 0; i < waveCount; i++) {
        context.beginPath();

        const baseY = (height / waveCount) * i;

        context.moveTo(0, baseY);

        for (let x = 0; x <= width; x += 10) {
            const waveHeight = Math.sin(
                (x / width) * Math.PI * 4 + i
            ) * random(style.minWaveHeight, style.maxWaveHeight);

            context.lineTo(
                x,
                baseY + waveHeight
            );
        }

        context.strokeStyle = getColorWithOpacity(
            settings.primaryColor,
            random(0.3, 0.9)
        );

        context.lineWidth = random(
            style.minLineWidth,
            style.maxLineWidth
        );

        context.stroke();
    }
}


/* =========================================
   8. PARTICLE ART
========================================= */

function drawParticles(context, width, height, settings) {
    const style = getArtStyle("particles").settings;

    const particleCount =
        settings.complexity * style.particleCountMultiplier;

    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: random(0, width),
            y: random(0, height),
            radius: random(style.minRadius, style.maxRadius)
        });
    }

    // Draw connections between nearby particles.

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const first = particles[i];
            const second = particles[j];

            const distance = Math.hypot(
                first.x - second.x,
                first.y - second.y
            );

            if (distance < style.connectionDistance) {
                context.beginPath();

                context.moveTo(first.x, first.y);
                context.lineTo(second.x, second.y);

                context.strokeStyle = getColorWithOpacity(
                    settings.primaryColor,
                    style.connectionOpacity
                );

                context.lineWidth = 1;
                context.stroke();
            }
        }
    }

    // Draw the particles.

    particles.forEach((particle) => {
        context.beginPath();

        context.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        context.fillStyle = settings.primaryColor;
        context.fill();
    });
}


/* =========================================
   9. PATTERN ART
========================================= */

function drawPatterns(context, width, height, settings) {
    const style = getArtStyle("patterns").settings;

    const gridSize = Math.max(
        style.minimumGridSize,
        style.baseGridSize -
        settings.complexity * style.complexityReduction
    );

    const shapeSize = gridSize * style.shapeSizeRatio;

    for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            context.fillStyle = getColorWithOpacity(
                settings.primaryColor,
                random(0.25, 0.9)
            );

            context.save();

            context.translate(
                x + gridSize / 2,
                y + gridSize / 2
            );

            const shape = randomInteger(1, 3);

            if (shape === 1) {
                context.beginPath();

                context.arc(
                    0,
                    0,
                    shapeSize / 2,
                    0,
                    Math.PI * 2
                );

                context.fill();

            } else if (shape === 2) {
                context.fillRect(
                    -shapeSize / 2,
                    -shapeSize / 2,
                    shapeSize,
                    shapeSize
                );

            } else {
                context.beginPath();

                context.moveTo(0, -shapeSize / 2);
                context.lineTo(shapeSize / 2, shapeSize / 2);
                context.lineTo(-shapeSize / 2, shapeSize / 2);

                context.closePath();
                context.fill();
            }

            context.restore();
        }
    }
}
