
/* =========================================
   GENERATIVE ART PLAYGROUND
   STUDIO PAGE CONTROLLER
========================================= */

import {
    createArtworkCanvas,
    generateArtwork
} from "../art/art-generator.js";

import {
    downloadCanvas
} from "../art/canvas-controls.js";


/* =========================================
   1. DEFAULT SETTINGS
========================================= */

const DEFAULT_SETTINGS = {
    artStyle: "geometric",
    primaryColor: "#A78BFA",
    backgroundColor: "#FFFFFF",
    complexity: 5
};

const studioSettings = { ...DEFAULT_SETTINGS };


/* =========================================
   2. INITIALIZE STUDIO
========================================= */

export function initializeStudioPage() {

    const canvasArea = document.querySelector(".canvas-area");
    const styleButtons = document.querySelectorAll(".art-style-option");
    const colorSwatches = document.querySelectorAll(".color-swatch");
    const customColor = document.querySelector("#custom-color");
    const backgroundButtons = document.querySelectorAll(".background-option");
    const complexitySlider = document.querySelector(".complexity-slider");

    const actionButtons = document.querySelectorAll(".canvas-actions button");
    const downloadButton = document.querySelector(".download-button");

    // Prevent errors if the required Studio HTML is missing.
    if (!canvasArea) {
        console.error("Studio canvas area not found.");
        return;
    }

    if (
        !styleButtons.length ||
        !colorSwatches.length ||
        !backgroundButtons.length ||
        !complexitySlider ||
        actionButtons.length < 3 ||
        !customColor ||
        !downloadButton
    ) {
        console.error("Some Studio controls could not be found.");
        return;
    }


    /* =========================================
       3. CANVAS MANAGEMENT
    ========================================= */

    let artworkCanvas = null;

    function getArtworkCanvas() {
        if (!artworkCanvas) {
            artworkCanvas = createArtworkCanvas(canvasArea);
        }

        return artworkCanvas;
    }

    function generateCurrentArtwork() {
        const canvas = getArtworkCanvas();
        generateArtwork(canvas, studioSettings);
    }


    /* =========================================
       4. GENERAL CONTROL FUNCTIONS
    ========================================= */

    function updateActiveButton(buttons, selectedButton) {
        buttons.forEach((button) => {
            button.classList.toggle(
                "active",
                button === selectedButton
            );
        });
    }

    function getArtStyleName(button) {
    return button.querySelector("span:last-child")
        ?.textContent.trim().toLowerCase();
}

    function updateArtworkIfCreated() {
        if (artworkCanvas) {
            generateCurrentArtwork();
        }
    }


    /* =========================================
       5. LOAD SAVED ART STYLE
    ========================================= */

    function loadSavedArtStyle() {
        const savedStyle = sessionStorage.getItem("selectedArtStyle");

        if (!savedStyle) return;

        const selectedButton = [...styleButtons].find(
            (button) => getArtStyleName(button) === savedStyle
        );

        if (selectedButton) {
            updateActiveButton(styleButtons, selectedButton);
            studioSettings.artStyle = savedStyle;
        }

        sessionStorage.removeItem("selectedArtStyle");
    }


    /* =========================================
       6. ART STYLE SELECTION
    ========================================= */

    function setupArtStyleSelection() {
        styleButtons.forEach((button) => {
            button.addEventListener("click", () => {
                updateActiveButton(styleButtons, button);

                studioSettings.artStyle = getArtStyleName(button);

                updateArtworkIfCreated();
            });
        });
    }


    /* =========================================
       7. COLOR SELECTION
    ========================================= */

    function setupColorSelection() {
        colorSwatches.forEach((swatch) => {
            swatch.addEventListener("click", () => {
                updateActiveButton(colorSwatches, swatch);

                const color = getComputedStyle(swatch)
                    .getPropertyValue("--swatch-color")
                    .trim();

                studioSettings.primaryColor = color;
                customColor.value = color;

                updateArtworkIfCreated();
            });
        });
    }


    /* =========================================
       8. CUSTOM COLOR
    ========================================= */

    function setupCustomColor() {
        customColor.addEventListener("input", () => {
            const color = customColor.value;

            colorSwatches.forEach((swatch) => {
                swatch.classList.remove("active");
            });

            studioSettings.primaryColor = color;

            updateArtworkIfCreated();
        });
    }


    /* =========================================
       9. BACKGROUND SELECTION
    ========================================= */

    function setupBackgroundSelection() {
        backgroundButtons.forEach((button) => {
            button.addEventListener("click", () => {
                updateActiveButton(backgroundButtons, button);

                const color = getComputedStyle(button)
                    .getPropertyValue("--background-color")
                    .trim();

                studioSettings.backgroundColor = color;
                canvasArea.style.backgroundColor = color;

                updateArtworkIfCreated();
            });
        });
    }


    /* =========================================
       10. COMPLEXITY CONTROL
    ========================================= */

    function setupComplexityControl() {
        complexitySlider.addEventListener("input", () => {
            studioSettings.complexity = Number(complexitySlider.value);

            updateArtworkIfCreated();
        });
    }


    /* =========================================
       11. GENERATE ARTWORK
    ========================================= */

    function setupGenerateButton() {
        actionButtons[0].addEventListener("click", () => {
            generateCurrentArtwork();
        });
    }


    /* =========================================
       12. RANDOMIZE SETTINGS
    ========================================= */

    function randomizeSettings() {

        // Random art style
        const randomStyle = styleButtons[
            Math.floor(Math.random() * styleButtons.length)
        ];

        updateActiveButton(styleButtons, randomStyle);
        studioSettings.artStyle = getArtStyleName(randomStyle);


        // Random color
        const randomSwatch = colorSwatches[
            Math.floor(Math.random() * colorSwatches.length)
        ];

        updateActiveButton(colorSwatches, randomSwatch);

        const color = getComputedStyle(randomSwatch)
            .getPropertyValue("--swatch-color")
            .trim();

        studioSettings.primaryColor = color;
        customColor.value = color;


        // Random background
        const randomBackground = backgroundButtons[
            Math.floor(Math.random() * backgroundButtons.length)
        ];

        updateActiveButton(backgroundButtons, randomBackground);

        const backgroundColor = getComputedStyle(randomBackground)
            .getPropertyValue("--background-color")
            .trim();

        studioSettings.backgroundColor = backgroundColor;
        canvasArea.style.backgroundColor = backgroundColor;


        // Random complexity
        studioSettings.complexity =
            Math.floor(Math.random() * 10) + 1;

        complexitySlider.value = studioSettings.complexity;
    }


    /* =========================================
       13. RANDOMIZE BUTTON
    ========================================= */

    function setupRandomizeButton() {
        actionButtons[1].addEventListener("click", () => {
            randomizeSettings();
            generateCurrentArtwork();
        });
    }


    /* =========================================
       14. RESET SETTINGS
    ========================================= */

    function resetSettings() {
        Object.assign(studioSettings, DEFAULT_SETTINGS);

        // Reset art style
        const defaultStyle = [...styleButtons].find(
            (button) => getArtStyleName(button) === DEFAULT_SETTINGS.artStyle
        );

        if (defaultStyle) {
            updateActiveButton(styleButtons, defaultStyle);
        }

        // Reset color
        const defaultColorSwatch = [...colorSwatches].find(
            (swatch) =>
                getComputedStyle(swatch)
                    .getPropertyValue("--swatch-color")
                    .trim()
                    .toUpperCase() === DEFAULT_SETTINGS.primaryColor
        );

        if (defaultColorSwatch) {
            updateActiveButton(colorSwatches, defaultColorSwatch);
        }

        customColor.value = DEFAULT_SETTINGS.primaryColor;

        // Reset background
        const defaultBackground = [...backgroundButtons].find(
            (button) =>
                getComputedStyle(button)
                    .getPropertyValue("--background-color")
                    .trim()
                    .toUpperCase() === DEFAULT_SETTINGS.backgroundColor
        );

        if (defaultBackground) {
            updateActiveButton(backgroundButtons, defaultBackground);
        }

        canvasArea.style.backgroundColor = DEFAULT_SETTINGS.backgroundColor;

        // Reset complexity
        complexitySlider.value = DEFAULT_SETTINGS.complexity;
    }


    /* =========================================
       15. RESET BUTTON
    ========================================= */

    function setupResetButton() {
        actionButtons[2].addEventListener("click", () => {
            resetSettings();
            generateCurrentArtwork();
        });
    }


    /* =========================================
       16. DOWNLOAD ARTWORK
    ========================================= */

    function setupDownloadButton() {
        downloadButton.addEventListener("click", () => {
            if (!artworkCanvas) {
                generateCurrentArtwork();
            }

            downloadCanvas(
                artworkCanvas,
                "generative-artwork.png"
            );
        });
    }


    /* =========================================
       17. INITIALIZE ALL STUDIO CONTROLS
    ========================================= */

    loadSavedArtStyle();

    setupArtStyleSelection();
    setupColorSelection();
    setupCustomColor();
    setupBackgroundSelection();
    setupComplexityControl();

    setupGenerateButton();
    setupRandomizeButton();
    setupResetButton();
    setupDownloadButton();

    console.log("Studio page initialized.");
}
