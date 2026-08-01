const { analyze } = require("../services/analyzerService");

const analyzeWebsite = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "Website URL is required."
            });
        }

        const result = await analyze(url);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { analyzeWebsite };