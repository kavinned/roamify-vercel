import { createAsyncThunk } from "@reduxjs/toolkit";
import { attractionsURL, cityURL, hotelURL } from "../../utils/API_URLS";
import { Places } from "../reducers/poiSlice";
import { Hotel } from "../reducers/hotelSlice";

export interface CityData {
    entityId: string;
    name: string;
    latlng: string;
    description: string;
    image: string;
}

export const cityThunk = createAsyncThunk(
    "city/city",
    async (cityName: string, thunkApi) => {
        try {
            const response = await fetch(cityURL(cityName), {
                method: "GET",
            });
            const data = await response.json();

            if (!response.ok) {
                return thunkApi.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }
            const airScrapperData = data.airscrapperData.data[0];
            const airScrapperTransformed = {
                entityId: airScrapperData.entityId,
                name: airScrapperData.entityName,
                latlng: airScrapperData.location,
            };

            type WikiResponse = typeof data.wikiData.query.pages;

            const wikipediaData: WikiResponse = Object.values(
                data.wikiData.query.pages
            )[0];
            const wikipediaExtract = wikipediaData.extract;
            const sentences = wikipediaExtract.split(". ");
            const shortenedSentences = sentences?.slice(0, 6).join(". ") + ".";

            const transformedData: CityData = {
                ...airScrapperTransformed,
                description: shortenedSentences ?? "",
                image: wikipediaData.thumbnail.source,
            };
            return transformedData;
        } catch (error) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
);

export const cityPlacesThunks = createAsyncThunk(
    "city/cityPlaces",
    async ({ lat, lng }: { lat: string; lng: string }, thunkApi) => {
        try {
            const response = await fetch(attractionsURL(lat, lng), {
                method: "GET",
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkApi.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }

            type PlaceResponse = (typeof data.results)[0];

            const transformedData: Places[] = data.results.map(
                (place: PlaceResponse) => {
                    return {
                        name: place.name,
                        address: place.address,
                        phone: place.phone_number,
                        site: place.website,
                        types: place.types,
                    };
                }
            );

            return transformedData;
        } catch (error) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
);

export const hotelThunk = createAsyncThunk(
    "city/hotel",
    async (
        {
            entityId,
            checkInDate,
            checkOutDate,
        }: { entityId: string; checkInDate: string; checkOutDate: string },
        thunkApi
    ) => {
        try {
            const response = await fetch(
                hotelURL(entityId, checkInDate, checkOutDate),
                {
                    method: "GET",
                }
            );
            const data = await response.json();

            if (!response.ok) {
                return thunkApi.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }

            type HotelResponse = (typeof data.data.hotels)[0];

            const transformedData: Hotel[] = data.data.hotels.map(
                (hotel: HotelResponse) => {
                    return {
                        name: hotel.name,
                        stars: hotel.stars,
                        image: hotel.heroImage,
                        distance: hotel.distance,
                        distanceFromPoi: hotel.relevantPoiDistance,
                        pricePerNight: hotel.priceDescription,
                        cheapestPartner: hotel.cheapestOfferPartnerName,
                    };
                }
            );

            return transformedData;
        } catch (error) {
            if (error instanceof Error) {
                return thunkApi.rejectWithValue(error.message);
            }
        }
    }
);