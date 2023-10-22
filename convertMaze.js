console.log("convertMaze.js loaded");
// Load the image into a canvas
async function loadImage(src) {
    console.log("Entering loadImage with src:", src);
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            console.log("Image loaded successfully");
            resolve(img);
        };
        img.onerror = () => {
            console.log("Failed to load image from:", src);
        };
        img.src = src;
    });
}

async function convertMaze(imagePath, colCount) {
    console.log("Called: convertMaze(", imagePath, colCount, ")");
    window.sharedData = null;
    const canvas = document.createElement('canvas');
    canvas.willReadFrequently = true;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    // ctx.willReadFrequently(true);
    const img = await loadImage(imagePath);
    if(!img) {
        console.log("Image loading failed. Exiting convertMaze.");
        return;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imgWidth = img.width;
    const imgHeight = img.height;
    const columnCount = colCount;
    const rowCount = columnCount;
    const gridWidth = Math.floor(imgWidth / columnCount);
    const gridHeight = Math.floor(imgHeight / rowCount);

    console.log("Image dimensions:", imgWidth, "x", imgHeight);
    console.log("Grid dimensions:", gridWidth, "px x", gridHeight, "px");

    let jsList = [];

    for (let row = 0; row < rowCount; row++) {
        let rowList = [];
        for (let col = 0; col < columnCount; col++) {
            const x1 = col * gridWidth;
            const y1 = row * gridHeight;
            let x2 = x1 + gridWidth - 1;
            let y2 = y1 + gridHeight - 1;

            x2 = Math.min(x2, imgWidth - 1);
            y2 = Math.min(y2, imgHeight - 1);

            const centerX = Math.floor((x1 + x2) / 2);
            const centerY = Math.floor((y1 + y2) / 2);

            const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;
            const red = pixelData[0];
            const green = pixelData[1];
            const blue = pixelData[2];
            
            const isWhite = (red + green + blue) / 3 >= 230;
            rowList.push(isWhite ? 1 : 0);
        }
        jsList.push(rowList);
    }

    // jsList.unshift("[");
    // jsList.push("]");
    // console.log("Generated jsList:", jsList);
    // 
    window.sharedData = jsList;
    return { jsList };
}

// Uncommented the example usage for further testing if needed
// convertMaze('image-path', 10).then((result) => {
//     console.log("Result from convertMaze:", result);
// });
