const express = require('express');
const analyzeRoute = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


analyzeRoute.post('/', async (req, res) => {
    const { sentence } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Rephrase the following sentence in a better way. Return only the rephrased sentence: "${sentence}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        res.status(200).json({ rephrased: text });
    } catch (error) {
        console.error("Error in /api/analyze:", error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = analyzeRoute;
