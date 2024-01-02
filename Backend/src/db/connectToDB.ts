import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDB = async () => {
    try {
        const db = 'mongodb+srv://yashsaini18166:yashsaini2005@cluster0.o5zrgt4.mongodb.net/?retryWrites=true&w=majority'
        mongoose.connect(db)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};