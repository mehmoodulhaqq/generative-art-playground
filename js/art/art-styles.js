
/* =========================================
   GENERATIVE ART PLAYGROUND
   ART STYLE CONFIGURATIONS
========================================= */


/* =========================================
   1. ART STYLE DEFINITIONS
========================================= */

export const ART_STYLES = {

    geometric: {
        name: "Geometric",
        description: "Bold shapes and abstract compositions",

        settings: {
            shapeTypes: ["circle", "rectangle"],
            minSize: 30,
            maxSize: 150,
            minOpacity: 0.2,
            maxOpacity: 0.8
        }
    },


    waves: {
        name: "Waves",
        description: "Flowing lines and organic movement",

        settings: {
            waveCountMultiplier: 3,
            minWaveHeight: 20,
            maxWaveHeight: 60,
            minLineWidth: 2,
            maxLineWidth: 6
        }
    },


    particles: {
        name: "Particles",
        description: "Connected dots and delicate networks",

        settings: {
            particleCountMultiplier: 25,
            minRadius: 2,
            maxRadius: 7,
            connectionDistance: 100,
            connectionOpacity: 0.2
        }
    },


    patterns: {
        name: "Patterns",
        description: "Repeating shapes and structured layouts",

        settings: {
            baseGridSize: 100,
            complexityReduction: 7,
            minimumGridSize: 20,
            shapeSizeRatio: 0.55,
            shapeTypes: ["circle", "square", "triangle"]
        }
    }

};


/* =========================================
   2. GET ALL ART STYLE NAMES
========================================= */

export function getArtStyleNames() {

    return Object.keys(ART_STYLES);

}


/* =========================================
   3. GET ART STYLE CONFIGURATION
========================================= */

export function getArtStyle(styleName) {

    return ART_STYLES[styleName] || ART_STYLES.geometric;

}


/* =========================================
   4. CHECK ART STYLE
========================================= */

export function isValidArtStyle(styleName) {

    return Object.prototype.hasOwnProperty.call(
        ART_STYLES,
        styleName
    );

}
