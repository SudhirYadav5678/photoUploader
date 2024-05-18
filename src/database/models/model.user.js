import mongoose, {Schema} from "mongoose"

const userSchema= new Schema({
    name:{
        type:String,
        required:[true, "Name is required Please fill the Name"],

    },
    email:{
        type:String,
        required:[true, "Email is required Please fill the email"],
        unique:[true, "email must be unique"]
     },
    password:{
        type:String,
        required:[true, "Password is required Please fill the password"],
        minlength:[6, "Password must be at least 6 characters long"],
        maxlength:[12, "Password must be at most 12 characters long"],
    },
    phone:{
        type:Number,
        unique:[true, "Phone must be unique"]    
    }
},{timestamps: true})

 export const User= mongoose.Model("Users", userSchema)