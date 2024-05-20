import mongoose from "mongoose"
import {DATABASE_NAME} from "../constant.js"

export async function connectDB(){
    try {
        console.log(DATABASE_NAME)
        const database= await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`)
        console.log("MongoDB is connected ")
    } catch (error) {
        console.log("Database connection error");
        process.exit(1)
    }
}