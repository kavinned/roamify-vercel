import { createSlice } from "@reduxjs/toolkit";
import { searchThunk } from "../thunks/searchThunk";
import { fetchError } from "./citySlice";

export interface Results {
    name: string;
}

interface InitialState {
    results: Results[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: fetchError;
}

const initialState: InitialState = {
    results: [],
    status: "idle",
    error: { message: "" },
};

const searchSlice = () =>
    createSlice({
        name: "search",
        initialState,
        reducers: {
            resetSearch: () => initialState,
        },
        extraReducers: (builder) => {
            builder
                .addCase(searchThunk.pending, (state) => {
                    state.status = "loading";
                    state.error = { message: "" };
                })
                .addCase(searchThunk.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.results = action.payload as Results[];
                })
                .addCase(searchThunk.rejected, (state, action) => {
                    state.status = "failed";
                    state.results = [];
                    state.error = action.payload as fetchError;
                });
        },
    });

export const searchReducer = searchSlice().reducer;

export const { resetSearch } = searchSlice().actions;