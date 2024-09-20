import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

 const url = process.env.MONGOURL

export const connectDB = () => {
    try{
        mongoose.connect(url)
        console.log("Database Connected");
    }
    catch(error){
        console.log(error.message)
    }
}