import { Schema, model } from "mongoose";
import { Places } from "../store/reducers/poiSlice";
import { Hotel } from "../store/reducers/hotelSlice";

export interface Itinerary {
    _id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    pointsOfInterest: Places[];
    hotel: Hotel;
    cityName: string;
    cityImage: string;
}

const hotelSchema = new Schema<Hotel>({
    name: { type: String, required: true },
    stars: { type: Number, required: true },
    image: { type: String, required: true },
    distance: { type: String, required: true },
    distanceFromPoi: { type: String, required: true },
    pricePerNight: { type: String, required: true },
    cheapestPartner: { type: String, required: true },
});

const pointsOfInterestSchema = new Schema<Places>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String },
    site: { type: String },
    types: { type: [String], required: true },
});

const itinerarySchema = new Schema<Itinerary>({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pointsOfInterest: { type: [pointsOfInterestSchema], required: true },
    hotel: { type: hotelSchema, required: true },
    cityName: { type: String, required: true },
    cityImage: { type: String, required: true },
});

export const Itinerary = model<Itinerary>("Itinerary", itinerarySchema);
