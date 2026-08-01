function analyzeHeadings($) {

    const h1 = $("h1");
    const h2 = $("h2");
    const h3 = $("h3");
    const h4 = $("h4");
    const h5 = $("h5");
    const h6 = $("h6");

    function getTexts(elements) {
        const arr = [];

        elements.each((i, el) => {
            const text = $(el).text().trim();

            if (text !== "") {
                arr.push(text);
            }
        });

        return arr;
    }

    return {

        totalHeadings:
            h1.length +
            h2.length +
            h3.length +
            h4.length +
            h5.length +
            h6.length,

        h1Count: h1.length,
        h2Count: h2.length,
        h3Count: h3.length,
        h4Count: h4.length,
        h5Count: h5.length,
        h6Count: h6.length,

        missingH1:
            h1.length === 0,

        multipleH1:
            h1.length > 1,

        h1List: getTexts(h1),
        h2List: getTexts(h2),
        h3List: getTexts(h3),
        h4List: getTexts(h4),
        h5List: getTexts(h5),
        h6List: getTexts(h6)

    };

}

module.exports = {
    analyzeHeadings
};