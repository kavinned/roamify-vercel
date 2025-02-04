import { createSlice } from "@reduxjs/toolkit";
import {
    checkAuthStatus,
    loginThunk,
    logoutThunk,
    registerThunk,
} from "../thunks/authThunk";
import { fetchError } from "./citySlice";

interface User {
    _id: string;
    email: string;
    name: string;
    itineries?: { name: string; description: string }[];
}

interface initialState {
    isAuth: boolean;
    status: "idle" | "loading" | "succeeded" | "failed";
    user: null | User;
    loginError: fetchError;
    registerError: fetchError;
    error: fetchError;
}

const initialState: initialState = {
    isAuth: false,
    user: null,
    status: "idle",
    loginError: { message: "" },
    registerError: { message: "" },
    error: { message: "" },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetLoad: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = "loading";
                state.loginError = { message: "" };
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuth = true;
                state.user = action.payload.user;
                localStorage.removeItem("draftItinerary");
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = "failed";
                state.loginError = action.payload as fetchError;
            })
            .addCase(registerThunk.pending, (state) => {
                state.status = "loading";
                state.registerError = { message: "" };
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.status = "succeeded";
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.status = "failed";
                state.registerError = action.payload as fetchError;
            })
            .addCase(logoutThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logoutThunk.fulfilled, () => {
                localStorage.removeItem("draftItinerary");
                return initialState;
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as fetchError;
            })
            .addCase(checkAuthStatus.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.isAuth = true;
                state.user = action.payload;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.status = "failed";
                state.isAuth = false;
                state.user = null;
            });
    },
});

export const authReducer = authSlice.reducer;

export const { resetLoad } = authSlice.actions;
