
/* =========================================
   GENERATIVE ART PLAYGROUND
   REUSABLE COMPONENTS
========================================= */


/* =========================================
   1. NAVBAR
========================================= */

export function initializeNavbar() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
       const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
           navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) &&
            !navLinks.contains(event.target)) {

           navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}


/* =========================================
   2. ART STYLE SELECTOR
========================================= */

export function initializeArtStyleSelector(onChange) {
    const styleButtons = document.querySelectorAll(
        ".art-style-option"
    );

    if (!styleButtons.length) return;

    styleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            styleButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const style = button.querySelector("span:last-child")
    ?.textContent.trim().toLowerCase();

            if (typeof onChange === "function") {
                onChange(style);
            }
        });
    });
}


/* =========================================
   3. COLOR PICKER
========================================= */

export function initializeColorPicker(onChange) {
    const colorSwatches = document.querySelectorAll(
        ".color-swatch"
    );

    const customColorInput = document.querySelector(
        "#custom-color"
    );

    let selectedColor = "#A78BFA";

    function updateColor(color) {
        selectedColor = color;

        if (typeof onChange === "function") {
            onChange(selectedColor);
        }
    }

    colorSwatches.forEach((swatch) => {
        swatch.addEventListener("click", () => {
            colorSwatches.forEach((item) => {
                item.classList.remove("active");
            });

            swatch.classList.add("active");

            const color = getComputedStyle(swatch)
                .getPropertyValue("--swatch-color")
                .trim();

            if (customColorInput) {
                customColorInput.value = color;
            }

            updateColor(color);
        });
    });

    if (customColorInput) {
        customColorInput.addEventListener("input", () => {
            colorSwatches.forEach((item) => {
                item.classList.remove("active");
            });

            updateColor(customColorInput.value);
        });
    }

    return {
        getSelectedColor: () => selectedColor
    };
}


/* =========================================
   4. BACKGROUND SELECTOR
========================================= */

export function initializeBackgroundSelector(onChange) {
    const backgroundButtons = document.querySelectorAll(
        ".background-option"
    );

    if (!backgroundButtons.length) return;

    backgroundButtons.forEach((button) => {
        button.addEventListener("click", () => {
            backgroundButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const color = getComputedStyle(button)
                .getPropertyValue("--background-color")
                .trim();

            if (typeof onChange === "function") {
                onChange(color);
            }
        });
    });
}
