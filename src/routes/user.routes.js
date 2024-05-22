import {Router} from "express"
import { register,userLogin, userLogout } from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import {verifyJwt} from "../middleware/auth.middleware.js"

const router= Router()
router.route("/register").post(
    upload.fields([{
        name: "avatar", // forntend also used this name as avatar.
        maxCount: 1
    }]),
    register)
router.route("/login").post(userLogin)

//secure route
router.route("/userLogout").post(verifyJwt, userLogout)

export default router