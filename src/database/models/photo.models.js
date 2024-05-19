import mongoose, { Schema } from "mongoose"

const PhotosSchema=new Schema({
    title:{
        type:String,
        required:[true,"title is required "],
        minlength:[5, "Password must be at least 5 characters long"],
        maxlength:[120, "Password must be at most 120 characters long"],
    },
    photoFile:{
        type:String,
        required:[true,"photoFile is required "],

    },
    description:{
        type:String,
        required:[true, "description is required"],
        minlength:[5, "Password must be at least 5 characters long"],
        maxlength:[120, "Password must be at most 120 characters long"],
    },
    owner:{
        type:Schema.Types.ObjectId, //refernces with users.
        ref:"User"
    }
},{timestamps:true})

export const Photos=mongoose.model("Photos",PhotosSchema)