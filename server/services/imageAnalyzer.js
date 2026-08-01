function analyzeImages($, baseUrl) {

    const images = $("img");

    let totalImages = images.length;

    let imagesWithAlt = 0;
    let imagesWithoutAlt = 0;

    let lazyLoadedImages = 0;

    let jpgImages = 0;
    let pngImages = 0;
    let webpImages = 0;
    let svgImages = 0;

    let base64Images = 0;

    let internalImages = 0;
    let externalImages = 0;

    images.each((i, img) => {

        const src = $(img).attr("src") || "";

        const alt = $(img).attr("alt");

        const loading = $(img).attr("loading");

        if (alt && alt.trim() !== "") {

            imagesWithAlt++;

        } else {

            imagesWithoutAlt++;

        }

        if (loading === "lazy") {

            lazyLoadedImages++;

        }

        const lower = src.toLowerCase();

        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) jpgImages++;

        if (lower.endsWith(".png")) pngImages++;

        if (lower.endsWith(".webp")) webpImages++;

        if (lower.endsWith(".svg")) svgImages++;

        if (lower.startsWith("data:image")) {

            base64Images++;

        }

        if (src.startsWith("http")) {

            if (src.includes(new URL(baseUrl).hostname)) {

                internalImages++;

            } else {

                externalImages++;

            }

        } else {

            internalImages++;

        }

    });

    return {

        totalImages,

        imagesWithAlt,

        imagesWithoutAlt,

        lazyLoadedImages,

        jpgImages,

        pngImages,

        webpImages,

        svgImages,

        base64Images,

        internalImages,

        externalImages

    };

}

module.exports = {

    analyzeImages

};