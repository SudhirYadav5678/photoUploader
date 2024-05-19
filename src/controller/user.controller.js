import {asyncHandler} from "../utiles/asyncHandler.js"
import {ApiError} from "../utiles/apiError.js"
import { User } from "../database/models/user.model.js"
import {uploadOnCloudinary} from "../utiles/cloudinar.js"
import {ApiResponse} from "../utiles/apiResponces.js"

const register= asyncHandler(async(req, res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res



    // accepting data from user.
    const{name, email, password, phone }=req.body      //req.body get data from the body and form but for url there is other method.
    console.log(email,"email");

    // if(!name){
    //     throw new ApiError(400, "name is required")
    // }
    if ([name, email, password].some((field)=>{
        field?.trim()===""
    })) {
        throw new ApiError(400, "all fiels are required.")
    }
    const existedUser=User.findOne({
        $or:[{email}] //$or operater used for find the multiple optins.
    })
    if (existedUser) {
        throw new ApiError(400, "email aready used please provide other email")

    }

    const avatarLocalPath=req.files?.avatar[0].path //get files path with multer 
    console.log(avatarLocalPath,"avatarLocalPath");

    const avatar= await uploadOnCloudinary(avatarLocalPath)
    console.log(avatar, "avatar");


    // database entry 
    const user= await User.create({
        name,
        email,
        password,
        phone:phone || "",
        avatar:avatar.url
    })
    const createdUser= await User.findById(user._id)
    .select("-password -refreshToke ")  //-field remove these files

    if (!createdUser) {
        throw new ApiError(500, "user not created in db" )
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registerd successfully")
    )
})

export {register}