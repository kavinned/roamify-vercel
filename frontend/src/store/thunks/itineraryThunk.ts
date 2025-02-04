import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteItineraryURL, itineraryURL } from "../../utils/API_URLS";
import { Itinerary } from "../../models/Itinerary";

export const fetchItineraries = createAsyncThunk(
    "itinerary/fetchItineraries",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(itineraryURL, {
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

export const createItinerary = createAsyncThunk(
    "itinerary/createItinerary",
    async (itinerary: Itinerary, thunkAPI) => {
        try {
            const response = await fetch(itineraryURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itinerary),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

export const deleteItinerary = createAsyncThunk(
    "itinerary/deleteItinerary",
    async (id: string, thunkAPI) => {
        try {
            const response = await fetch(deleteItineraryURL(id), {
                method: "DELETE",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }

            return id;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);
