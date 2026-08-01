function analyzeMeta($) {

    const getMeta = (name) =>
        $(`meta[name="${name}"]`).attr("content") || "";

    const getProperty = (property) =>
        $(`meta[property="${property}"]`).attr("content") || "";

    return {

        title: $("title").text().trim(),

        description: getMeta("description"),

        keywords: getMeta("keywords"),

        author: getMeta("author"),

        robots: getMeta("robots"),

        viewport: getMeta("viewport"),

        charset:
            $("meta[charset]").attr("charset") || "",

        language:
            $("html").attr("lang") || "",

        canonical:
            $('link[rel="canonical"]').attr("href") || "",

        themeColor:
            getMeta("theme-color"),

        generator:
            getMeta("generator"),

        openGraph: {

            title: getProperty("og:title"),

            description: getProperty("og:description"),

            image: getProperty("og:image"),

            url: getProperty("og:url"),

            type: getProperty("og:type"),

            siteName: getProperty("og:site_name")

        },

        twitter: {

            card: getMeta("twitter:card"),

            title: getMeta("twitter:title"),

            description: getMeta("twitter:description"),

            image: getMeta("twitter:image")

        }

    };

}

module.exports = analyzeMeta;