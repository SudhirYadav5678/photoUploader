import dotenv from "dotenv"
import {connectDB} from "./database/DBConnections/dbConnection.js"
import {app} from "./app.js"


dotenv.config({
    path: './.env'
})
connectDB()
// server is listening

.then(
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}` );
    }),
    app.on("error", ()=>{
        console.log("Server is down")
    })
)
.catch(()=>{
    console.log(error, "this is a serverside connection error")
})
