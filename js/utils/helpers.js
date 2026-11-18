
/* =========================================
   GENERATIVE ART PLAYGROUND
   REUSABLE HELPER FUNCTIONS
========================================= */


/* =========================================
   1. DOM SELECTORS
========================================= */

export function selectElement(selector, parent = document) {
    return parent.querySelector(selector);
}


export function selectAllElements(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}


/* =========================================
   2. RANDOM NUMBER UTILITIES
========================================= */

export function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


export function getRandomInteger(min, max) {
    return Math.floor(getRandomNumber(min, max + 1));
}


/* =========================================
   3. VALUE UTILITIES
========================================= */

export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


export function getRandomItem(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    const randomIndex = getRandomInteger(0, items.length - 1);

    return items[randomIndex];
}


/* =========================================
   4. COLOR UTILITIES
========================================= */

export function isValidHexColor(color) {
    return /^#([0-9A-Fa-f]{6})$/.test(color);
}


/* =========================================
   5. GENERAL UTILITIES
========================================= */

export function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}


export function generateUniqueId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 9)
    );
}
