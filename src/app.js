import express from "express"
import cors from "cors"
import cookiePareser from "cookie-parser"

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN, //FROM WHERE our backend can connet.
}))// use for middleware and congigurations. cors used for cross origin sharing. connet fornet and backend.

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded())// data getting from the url then space and special character understood by urlencoded.
app.use(express.static("public/temp"))// static use to store some files on own server(Public)
app.use(cookiePareser()) //used for acces user cookies.



import userRoutes from "./routes/user.routes.js"
//route declerations
app.use("/api/v1/users", userRoutes)

export {app}