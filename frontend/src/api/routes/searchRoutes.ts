import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    const { query } = req.query;
    const username = process.env.GEONAMES_UN;

    const URL = `http://api.geonames.org/search?name=${query}&maxRows=5&username=${username}&type=json&featureClass=P&orderby=population&lang=en&style=MEDIUM`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.geonames.length === 0 || data.totalResultsCount === 0) {
            res.status(404).json({ message: "No cities found matching query" });
            return;
        }

        res.json(data);
        return;
    } catch (error) {
        res.status(500).json({ message: `${error} Failed to fetch` });
    }
});
export default router;
