import mongoose, {Schema} from "mongoose"
import bcrypt, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"

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

userSchema.pre("save", async function(next){
    if (!this.isModified("password")){return next()}
    this.password=bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcessToken= function(){
    return jwt.sign({
        _id:this._id
     },
     process.env.JWT_ACCESS_TOKEN,
     {
        expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRY   
     }
)
}
userSchema.methods.generateRefreshAcessToken= function(){
    return jwt.sign({
        _id:this._id
     },
     process.env.JWT_REFRESH_TOKEN,
     {
        expiresIn:process.env.JWT_REFRESH_TOKEN_EXPIRY   
     }
)
}

// const  encruptedPassword= async function(){
//     const salt= await bcrypt.genSalt(10)
//     const hash= await bcrypt.hash(this.password, salt)
// }

 export const User= mongoose.Model("Users", userSchema)