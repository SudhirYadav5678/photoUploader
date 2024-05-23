import {asyncHandler} from "../utiles/asyncHandler.js"
import {ApiError} from "../utiles/apiError.js"
import { User } from "../database/models/user.model.js"
import {uploadOnCloudinary} from "../utiles/cloudinar.js"
import {ApiResponse} from "../utiles/apiResponces.js"

//refresh and access token
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

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
    const existedUser= await User.findOne({
        $or:[{email}] //$or mongodb operater used for find the multiple optins.
    })
    if (existedUser) {
        throw new ApiError(400, "email aready used please provide other email")

    }

    const avatarLocalPath=req.files?.avatar[0].path //get files path with multer 
    //console.log(avatarLocalPath,"avatarLocalPath");
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar= await uploadOnCloudinary(avatarLocalPath)
    //console.log(avatar, "avatar");


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


//login
const userLogin= asyncHandler(async(req, res)=>{
    const {email, password}= req.body
    if (!email && !password) {
        throw new ApiError(400, "email and password are required")}
    
    const user= User.findOne({email})
    if (!user) {
        throw new ApiError(400, "user does not exist")
    };
    const ispasswordVaild= await user.isPasswordCorrect(password);
    if (!ispasswordVaild) {
         throw new ApiError(401, "incorrect password")
     }
    //create refresh token
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    //send cookies
    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refershToken", refreshToken, options)
    .json(
        new ApiResponse(200, {user:accessToken, refreshToken}, "user login successfully")
    )

}
)
    //registerications
    //get email and password req body
    // check user info.
    //refreshtoken  access check
    //send cookies
    //route login
    

//logout
const userLogout= async function(){
    //user access
    //check login 
    //delete cookies
    //refreshtoken delete
    //route logout
     await User.findByIdAndUpdate( //database token clear
        req.user._id,{
            $set:{refreshToken:undefined},//mongoose operater $set
             
        },{
            new:true,
        }
    ) //authmiddleware

    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200).clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logout "))
    


}
export {register, userLogin, userLogout}