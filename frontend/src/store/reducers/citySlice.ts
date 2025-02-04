import { createSlice } from "@reduxjs/toolkit";
import { cityThunk } from "../thunks/cityThunk";

export type fetchError = {
    message: string;
    status?: number;
};

interface InitialState {
    entityId: string | null;
    latlng: string | null;
    name: string | null;
    description: string | null;
    image: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: fetchError;
}

const initialState: InitialState = {
    entityId: null,
    latlng: null,
    name: null,
    description: null,
    image: null,
    status: "idle",
    error: { message: "" },
};

const citySlice = () =>
    createSlice({
        name: "city",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(cityThunk.pending, (state) => {
                    state.status = "loading";
                    state.error = { message: "" };
                })
                .addCase(cityThunk.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    if (action.payload) {
                        state.entityId = action.payload.entityId;
                        state.latlng = action.payload.latlng;
                        state.name = action.payload.name;
                        state.description = action.payload.description;
                        state.image = action.payload.image;
                    }
                })
                .addCase(cityThunk.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.payload as fetchError;
                });
        },
    });

export const cityReducer = citySlice().reducer;
