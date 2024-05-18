import mongoose from "mongoose"

export async function connectDB(){
    try {
        const database= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}` )
        console.log("MongoDB is connected ")
    } catch (error) {
        console.log("Database connection error");
        process.exit(1)
    }
}