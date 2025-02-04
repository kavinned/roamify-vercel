import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    const { name: cityName } = req.query;

    if (!cityName) {
        res.status(400).json({ message: "Please provide a city name" });
        return;
    }

    const formattedName = (cityName as string)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const wikiURL = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedName}&prop=extracts|pageimages&exintro&explaintext&format=json&pithumbsize=500&origin=*`;

    let airscrapperURL;
    if (process.env.NODE_ENV !== "development") {
        airscrapperURL = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel?query=${formattedName}`;
    } else {
        airscrapperURL = "http://localhost:3001/destinations";
    }

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": process.env.AIR_SCRAPPER_HOST as string,
        },
    };

    try {
        const [wikiResponse, airscrapperResponse] = await Promise.all([
            fetch(wikiURL),
            fetch(airscrapperURL, options),
        ]);

        const [wikiData, airscrapperData] = await Promise.all([
            wikiResponse.json(),
            airscrapperResponse.json(),
        ]);

        if (!wikiData?.query?.pages) {
            throw new Error("Invalid Wikipedia API response");
        }

        const obj = wikiData.query.pages;

        if (
            !obj ||
            (obj[-1] &&
                Object.prototype.hasOwnProperty.call(obj[-1], "missing"))
        ) {
            res.status(404).json({ message: "City not found" });
            return;
        }

        res.json({
            wikiData,
            airscrapperData,
        });
        return;
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: `${error} Failed to fetch` });
    }
});

router.get("/places", async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        res.status(400).json({
            message: "Please provide latitude and longitude",
        });
        return;
    }

    let placesURL;
    if (process.env.NODE_ENV !== "development") {
        placesURL = `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&type=tourist_attraction&radius=10000&language=en`;
    } else {
        placesURL = "http://localhost:3001/places";
    }

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": process.env.TRUEWAY_HOST as string,
        },
    };

    try {
        const response = await fetch(placesURL, options);
        const data = await response.json();
        res.json(data);
        return;
    } catch (error) {
        res.status(500).json({ message: `${error} Failed to fetch` });
    }
});

router.get("/hotels", async (req, res) => {
    const { entityId, checkinDate, checkoutDate } = req.query;

    if (!entityId || !checkinDate || !checkoutDate) {
        res.status(400).json({
            message: "Please provide an entityId, checkinDate and checkoutDate",
        });
        return;
    }

    let hotelsURL;
    if (process.env.NODE_ENV !== "development") {
        hotelsURL = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=${entityId}&checkin=${checkinDate}&checkout=${checkoutDate}&adults=1&rooms=1&limit=20&sorting=-hotel_rating&currency=USD&market=en-US&countryCode=US`;
    } else {
        hotelsURL = "http://localhost:3001/hotels";
    }

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": process.env.AIR_SCRAPPER_HOST as string,
        },
    };

    try {
        const response = await fetch(hotelsURL, options);
        const data = await response.json();
        res.json(data);
        return;
    } catch (error) {
        res.status(500).json({ message: `${error} Failed to fetch` });
    }
});

export default router;
