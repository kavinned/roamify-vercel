import { createSlice } from "@reduxjs/toolkit";
import { cityPlacesThunks } from "../thunks/cityThunk";
import { fetchError } from "./citySlice";

export interface Places {
    name: string;
    address: string;
    phone?: string;
    site?: string;
    types: string[];
}

interface InitialState {
    places: Places[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: fetchError;
}

const initialState: InitialState = {
    places: [],
    status: "idle",
    error: { message: "" },
};

const poiSlice = () =>
    createSlice({
        name: "poi",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(cityPlacesThunks.pending, (state) => {
                    state.places = [];
                    state.status = "loading";
                    state.error = { message: "" };
                })
                .addCase(cityPlacesThunks.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.places = action.payload as Places[];
                })
                .addCase(cityPlacesThunks.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as fetchError;
                });
        },
    });

export const poiReducer = poiSlice().reducer;
