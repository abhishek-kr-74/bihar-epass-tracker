// const express = require("express");
// const scraper = require("./services/scraper");

// const app = express();
// const PORT = 3000;

// app.use(express.json());
// app.use(express.static("public"));

// app.post("/api/search", async (req, res) => {
//     try {
//         const { vehicleNo } = req.body;

//         if (!vehicleNo) {
//             return res.status(400).json({
//                 error: "Vehicle number required"
//             });
//         }

//         const data = await scraper(vehicleNo);

//         res.json(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             error: "Scraping failed"
//         });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const scraper = require("./services/scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/search", async (req, res) => {
    try {
        const { vehicleNo } = req.body;

        if (!vehicleNo) {
            return res.status(400).json({
                error: "Vehicle number required"
            });
        }

        const data = await scraper(vehicleNo);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message || "Search failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});