
/* =========================================
   GENERATIVE ART PLAYGROUND
   HOME PAGE CONTROLLER
========================================= */

import {
    initializeNavbar
} from "../components/components.js";


/* =========================================
   1. INITIALIZE HOME PAGE
========================================= */

export function initializeHomePage() {

    initializeNavbar();

    const navigationLinks = document.querySelectorAll(".nav-link");

    const navigationSections = document.querySelectorAll(
        "#home, #gallery, #how-it-works"
    );

    const styleCards = document.querySelectorAll(".style-card");


    /* =========================================
       2. SMOOTH NAVIGATION
    ========================================= */

    function setupSmoothNavigation() {
        navigationLinks.forEach((link) => {
            link.addEventListener("click", (event) => {

                const targetId = link.getAttribute("href");

                if (!targetId || !targetId.startsWith("#")) {
                    return;
                }

                const targetSection = document.querySelector(targetId);

                if (!targetSection) {
                    return;
                }

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });
    }


    /* =========================================
       3. ACTIVE NAVIGATION
    ========================================= */

    function setupActiveNavigation() {

        if (!("IntersectionObserver" in window)) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const currentId = entry.target.id;

                navigationLinks.forEach((link) => {
                    const targetId = link.getAttribute("href");

                    link.classList.toggle(
                        "active",
                        targetId === `#${currentId}`
                    );
                });
            });
        }, {
            threshold: 0.3
        });

        navigationSections.forEach((section) => {
            observer.observe(section);
        });
    }


    /* =========================================
       4. ART STYLE SHORTCUTS
    ========================================= */

    function setupArtStyleShortcuts() {

        const artStyleNames = [
            "geometric",
            "waves",
            "particles",
            "patterns"
        ];

        styleCards.forEach((card, index) => {

            const selectedStyle = card.dataset.style || artStyleNames[index];

            if (!selectedStyle || !artStyleNames.includes(selectedStyle)) {
                return;
            }

            card.style.cursor = "pointer";

            card.addEventListener("click", () => {

                sessionStorage.setItem(
                    "selectedArtStyle",
                    selectedStyle
                );

                window.location.href = "studio.html";
            });
        });
    }


    /* =========================================
       5. RUN HOME PAGE FEATURES
    ========================================= */

    setupSmoothNavigation();
    setupActiveNavigation();
    setupArtStyleShortcuts();

    console.log("Home page initialized.");
}
