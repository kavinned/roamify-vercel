export const BASE_URL = import.meta.env.VITE_API_URL;


function searchURL(cityName: string) {
    return `${BASE_URL}/api/search?query=${cityName}`;
}

function cityURL(cityName: string) {
    return `${BASE_URL}/api/city?name=${cityName}`;
}

function hotelURL(
    entityId: string | number,
    checkinDate: string,
    checkoutDate: string
) {
    return `${BASE_URL}/api/city/hotels?entityId=${entityId}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}`;
}

function attractionsURL(lat: string, lng: string) {
    return `${BASE_URL}/api/city/places?lat=${lat}&lng=${lng}`;
}

function deleteItineraryURL(id: string) {
    return `${BASE_URL}/api/itineraries/${id}`;
}

const itineraryURL = `${BASE_URL}/api/itineraries`;

export {
    cityURL,
    hotelURL,
    attractionsURL,
    searchURL,
    deleteItineraryURL,
    itineraryURL,
};
