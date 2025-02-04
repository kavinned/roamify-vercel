import { createSlice } from "@reduxjs/toolkit";
import { Places } from "./poiSlice";
import { Hotel } from "./hotelSlice";

export interface draftItinerary {
    name: string;
    startDate: string;
    endDate: string;
    pointsOfInterest: Places[];
    hotel: Hotel | null;
    cityName: string;
    cityImage: string;
}

const initialState: draftItinerary = {
    name: "",
    startDate: "",
    endDate: "",
    pointsOfInterest: [],
    hotel: null,
    cityName: "",
    cityImage: "",
};

const draftItinerarySlice = () =>
    createSlice({
        name: "draftItinerary",
        initialState,
        reducers: {
            resetItinerary: () => {
                localStorage.removeItem("draftItinerary");
                return initialState;
            },
            addPoi: (state, action) => {
                localStorage.setItem(
                    "draftItinerary",
                    JSON.stringify({
                        ...state,
                        pointsOfInterest: [
                            ...state.pointsOfInterest,
                            action.payload,
                        ],
                    })
                );
                state.pointsOfInterest.push(action.payload);
            },
            addHotel: (state, action) => {
                localStorage.setItem(
                    "draftItinerary",
                    JSON.stringify({
                        ...state,
                        hotel: action.payload,
                    })
                );
                state.hotel = action.payload;
            },
            addDates: (state, action) => {
                localStorage.setItem(
                    "draftItinerary",
                    JSON.stringify({
                        ...state,
                        startDate: action.payload.startDate,
                        endDate: action.payload.endDate,
                    })
                );
                state.startDate = action.payload.startDate;
                state.endDate = action.payload.endDate;
            },
            addCity: (state, action) => {
                localStorage.setItem(
                    "draftItinerary",
                    JSON.stringify({
                        ...state,
                        cityName: action.payload.cityName,
                        cityImage: action.payload.cityImage,
                    })
                );
                state.cityName = action.payload.cityName;
                state.cityImage = action.payload.cityImage;
            },
        },
    });

export const draftyItineraryReducer = draftItinerarySlice().reducer;
export const { resetItinerary, addPoi, addHotel, addDates, addCity } =
    draftItinerarySlice().actions;
