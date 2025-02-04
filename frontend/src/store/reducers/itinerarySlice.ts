import { createSlice } from "@reduxjs/toolkit";
import {
    fetchItineraries,
    createItinerary,
    deleteItinerary,
} from "../thunks/itineraryThunk";
import { Itinerary } from "../../models/Itinerary";
import { fetchError } from "./citySlice";

interface ItineraryState {
    itineraries: Itinerary[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: fetchError;
}

const initialState: ItineraryState = {
    itineraries: [],
    status: "idle",
    error: { message: "" },
};

const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItineraries.pending, (state) => {
                state.status = "loading";
                state.error = { message: "" };
            })
            .addCase(fetchItineraries.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.itineraries = action.payload;
            })
            .addCase(fetchItineraries.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as fetchError;
            })
            .addCase(createItinerary.pending, (state) => {
                state.status = "loading";
                state.error = { message: "" };
            })
            .addCase(createItinerary.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.itineraries.push(action.payload);
            })
            .addCase(createItinerary.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as fetchError;
            })
            .addCase(deleteItinerary.pending, (state) => {
                state.status = "loading";
                state.error = { message: "" };
            })
            .addCase(deleteItinerary.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.itineraries = state.itineraries.filter(
                    (itinerary) => itinerary._id !== action.payload
                );
            })
            .addCase(deleteItinerary.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as fetchError;
            });
    },
});

export const itineraryReducer = itinerarySlice.reducer;
