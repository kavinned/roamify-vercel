import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./reducers/searchSlice";
import { itineraryReducer } from "./reducers/itinerarySlice";
import { hotelReducer } from "./reducers/hotelSlice";
import { cityReducer } from "./reducers/citySlice";
import { poiReducer } from "./reducers/poiSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { authReducer } from "./reducers/authSlice";
import { draftyItineraryReducer } from "./reducers/draftItinerarySlice";

type AppDispatch = typeof store.dispatch;
type AppStore = typeof store;

const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        itinerary: itineraryReducer,
        hotel: hotelReducer,
        city: cityReducer,
        poi: poiReducer,
        draft: draftyItineraryReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
