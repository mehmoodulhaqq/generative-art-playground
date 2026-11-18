
/* =========================================
   GENERATIVE ART PLAYGROUND
   MAIN APPLICATION ENTRY POINT
========================================= */

import { initializeHomePage } from "./pages/home.js";
import { initializeStudioPage } from "./pages/studio.js";


/* =========================================
   1. APPLICATION CONFIGURATION
========================================= */

const APP_CONFIG = {
    name: "Generative Art Playground",
    version: "1.0.0",

    pages: {
        home: "home",
        studio: "studio"
    }
};


/* =========================================
   2. APPLICATION STATE
========================================= */

const appState = {
    currentPage: null,
    isInitialized: false
};


/* =========================================
   3. PAGE DETECTION
========================================= */

function detectCurrentPage() {

    if (document.querySelector(".studio-section")) {
        return APP_CONFIG.pages.studio;
    }

    if (document.querySelector(".hero")) {
        return APP_CONFIG.pages.home;
    }

    return "unknown";
}


/* =========================================
   4. PAGE INITIALIZATION
========================================= */

function initializeCurrentPage() {

    switch (appState.currentPage) {

        case APP_CONFIG.pages.home:
            initializeHomePage();
            break;

        case APP_CONFIG.pages.studio:
            initializeStudioPage();
            break;

        default:
            console.warn("Unknown page detected.");
    }

}


/* =========================================
   5. APPLICATION INITIALIZATION
========================================= */

function initializeApp() {

    if (appState.isInitialized) {
        return;
    }

    appState.currentPage = detectCurrentPage();

    initializeCurrentPage();

    appState.isInitialized = true;

    console.log(`${APP_CONFIG.name} initialized.`);
    console.log(`Current page: ${appState.currentPage}`);
}


/* =========================================
   6. START APPLICATION
========================================= */

initializeApp();
