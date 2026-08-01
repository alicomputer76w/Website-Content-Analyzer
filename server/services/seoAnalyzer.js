const cheerio = require("cheerio");

function analyzeSEO(html) {
    const $ = cheerio.load(html);

    const title = $("title").text().trim();

    const metaDescription =
        $('meta[name="description"]').attr("content") || "";

    const canonical =
        $('link[rel="canonical"]').attr("href") || "";

    const robots =
        $('meta[name="robots"]').attr("content") || "";

    const language =
        $("html").attr("lang") || "";

    const charset =
        $("meta[charset]").attr("charset") || "";

    const viewport =
        $('meta[name="viewport"]').attr("content") || "";

    return {
        title,
        metaDescription,
        titleLength: title.length,
        descriptionLength: metaDescription.length,
        canonical,
        robots,
        language,
        charset,
        viewport
    };
}

module.exports = {
    analyzeSEO
};