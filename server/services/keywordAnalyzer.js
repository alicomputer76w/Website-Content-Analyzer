// Common English Stop Words
const STOP_WORDS = new Set([
    "the","is","in","on","at","of","to","a","an","and","or","for",
    "with","by","from","as","that","this","it","its","be","are",
    "was","were","has","have","had","will","can","could","would",
    "should","you","your","we","our","they","their","he","she",
    "his","her","them","i","me","my","do","does","did","not"
]);

function analyzeKeywords(text) {

    const words = text
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .filter(word => !STOP_WORDS.has(word));

    const totalWords = words.length;

    const frequency = {};

    for (const word of words) {
        frequency[word] = (frequency[word] || 0) + 1;
    }

    const keywords = Object.entries(frequency)
        .map(([word, count]) => ({
            word,
            count,
            density: ((count / totalWords) * 100).toFixed(2) + "%"
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

    return {
        totalUniqueWords: Object.keys(frequency).length,
        topKeywords: keywords
    };
}

module.exports = {
    analyzeKeywords
};