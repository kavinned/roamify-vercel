import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
    const uri: string = process.env.MONGODB_URI ?? "";
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB Connected`);
    return connection;
}

export default connectDB;
