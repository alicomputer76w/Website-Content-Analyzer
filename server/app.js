const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const analyzerRoutes = require("./routes/analyzer");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", analyzerRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Website Content Analyzer API is Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});