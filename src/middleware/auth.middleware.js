import { asyncHandler } from "../utiles/asyncHandler";
import {ApiError} from "../utiles/apiError.js"
import jwt from "jsonwebtoken"
import { User } from "../database/models/user.model.js";

const verifyJwt= asyncHandler(async(req, _, next)=>{ //_ used because _ not used.
    try {
        const token = req.cookies?.accessToken || req.header( 'Authorization' )?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthoriaztion access")
    }

    const decodedToen= await jwt.verify(token, process.env.JWT_ACCESS_TOKEN)

    const user= User.findById(decodedToen?._id).select( "-password -refreshToken" )
    if (!user) {
        throw new ApiError(401, "Invaild access token")
    }

    req.user=user // user information is adding in logout
    next()
    } catch (error) {
        throw new ApiError(401, "invaild access tokens")
    }
})

export {verifyJwt}