
/* =========================================
   GENERATIVE ART PLAYGROUND
   CANVAS CONTROLS
========================================= */


/* =========================================
   1. CLEAR CANVAS
========================================= */

export function clearCanvas(canvas, backgroundColor = "#FFFFFF") {

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    context.fillStyle = backgroundColor;

    context.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


/* =========================================
   2. GET CANVAS DIMENSIONS
========================================= */

export function getCanvasDimensions(canvas) {

    if (!canvas) return null;

    return {
        width: canvas.width,
        height: canvas.height,
        aspectRatio: (
            canvas.width / canvas.height
        ).toFixed(2)
    };

}


/* =========================================
   3. CONVERT CANVAS TO IMAGE
========================================= */

export function exportCanvas(canvas, format = "image/png") {

    if (!canvas) {
        console.error("Canvas not found.");
        return null;
    }

    try {

        return canvas.toDataURL(format);

    } catch (error) {

        console.error("Canvas export failed:", error);

        return null;

    }

}


/* =========================================
   4. DOWNLOAD CANVAS
========================================= */

export function downloadCanvas(
    canvas,
    filename = "generative-artwork.png"
) {

    const imageData = exportCanvas(canvas);

    if (!imageData) return;

    const downloadLink = document.createElement("a");

    downloadLink.download = filename;
    downloadLink.href = imageData;

    downloadLink.click();

}


/* =========================================
   5. CHECK CANVAS AVAILABILITY
========================================= */

export function isCanvasAvailable(canvas) {

    return canvas instanceof HTMLCanvasElement;

}
