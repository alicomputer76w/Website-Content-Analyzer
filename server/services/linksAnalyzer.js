const { URL } = require("url");

function analyzeLinks($, baseUrl) {

    const links = [];

    $("a").each((index, element) => {

        const href = $(element).attr("href");

        if (!href) return;

        links.push(href);

    });

    const base = new URL(baseUrl);

    const internalLinks = [];
    const externalLinks = [];

    links.forEach(link => {

        try {

            const absolute = new URL(link, baseUrl);

            if (absolute.hostname === base.hostname) {

                internalLinks.push(absolute.href);

            } else {

                externalLinks.push(absolute.href);

            }

        } catch {

        }

    });

    return {

        totalLinks: links.length,

        internalLinksCount: internalLinks.length,

        externalLinksCount: externalLinks.length,

        internalLinks,

        externalLinks

    };

}

module.exports = {

    analyzeLinks

};