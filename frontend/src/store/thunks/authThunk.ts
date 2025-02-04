import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/API_URLS";

interface credentials {
    email: string;
    password: string;
    name?: string;
}

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (credentials: credentials, thunkApi) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await fetch(`${BASE_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkApi.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }
            return data;
        } catch (error) {
            if (error instanceof Error)
                return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (credentials: credentials, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials),
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
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await fetch(`${BASE_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                return thunkAPI.rejectWithValue({
                    message: data.message,
                    status: response.status,
                });
            }
        } catch (error) {
            if (error instanceof Error)
                return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const checkAuthStatus = createAsyncThunk(
    "auth/checkStatus",
    async (_, thunkApi) => {
        try {
            const response = await fetch(`${BASE_URL}/api/users/verify`, {
                credentials: "include",
            });

            if (!response.ok) {
                return thunkApi.rejectWithValue({
                    message: "Unauthorized",
                    status: response.status,
                });
            }

            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error)
                return thunkApi.rejectWithValue(error.message);
        }
    }
);
