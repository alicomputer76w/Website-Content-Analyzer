const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { analyzeSEO } = require("./seoAnalyzer");
const { analyzeKeywords } = require("./keywordAnalyzer");
const { analyzeLinks } = require("./linksAnalyzer");
// Normalize URL
function normalizeUrl(url) {
    if (!/^https?:\/\//i.test(url)) {
        return "https://" + url;
    }
    return url;
}

async function analyze(url) {
    let browser;

    try {
        url = normalizeUrl(url);

        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: "networkidle2",
            timeout: 60000
        });

        const html = await page.content();

        const visibleText = await page.evaluate(() => {
            return document.body.innerText || "";
        });

        const $ = cheerio.load(html);

        const seo = analyzeSEO(html);
        const keywords = analyzeKeywords(visibleText);
        const linkAnalysis = analyzeLinks($, url);
        const paragraphs = $("p").length;
        const headings = $("h1,h2,h3,h4,h5,h6").length;
        const images = $("img").length;
        const links = $("a").length;

        const words = visibleText
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;

        const characters = visibleText.length;

        const charactersWithoutSpaces = visibleText.replace(/\s/g, "").length;

        const sentences = visibleText
            .split(/[.!?]+/)
            .filter(sentence => sentence.trim() !== "")
            .length;

        const lines = visibleText
            .split("\n")
            .filter(line => line.trim() !== "")
            .length;

        const readingTime = Math.max(1, Math.ceil(words / 200));

        const htmlSize = Buffer.byteLength(html, "utf8");

        const visibleTextSize = Buffer.byteLength(visibleText, "utf8");

        return {
            title: seo.title,

            characters,
            charactersWithoutSpaces,
            words,
            paragraphs,
            headings,
            images,
            links,
            sentences,
            lines,

            readingTime: `${readingTime} min`,
            htmlSize: `${(htmlSize / 1024).toFixed(2)} KB`,
            visibleTextSize: `${(visibleTextSize / 1024).toFixed(2)} KB`,

            seo,

            keywords,

            links: linkAnalysis
        };

    } catch (error) {
        throw new Error(`Website analysis failed: ${error.message}`);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = {
    analyze
};