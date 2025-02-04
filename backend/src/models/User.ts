import { Schema, Document, model, Types } from "mongoose";

interface User extends Document {
    email: string;
    password: string;
    name: string;
    itineraries: Types.ObjectId[];
}

const userSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    itineraries: [{ type: Types.ObjectId, ref: "Itinerary" }],
});

export const User = model<User>("User", userSchema);
