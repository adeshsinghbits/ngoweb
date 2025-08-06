import { Router } from "express";
import { loginAdmin, getAdmin, logoutAdmin, } from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/login").post( loginAdmin )

//secured routes
router.route("/getAdmin").get(verifyJWT, getAdmin )
router.route("/logout").post(verifyJWT,  logoutAdmin )


export default router