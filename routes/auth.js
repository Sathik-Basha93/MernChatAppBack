import express from "express";
import { upload , register , login , verify } from "../controllers/auth.controller.js";
import verifyUser from "../middleware/verifyUser.js";




const router = express.Router()

router.post('/register',upload.single('image'),register)

router.post('/login',login)

router.get('/verify',verifyUser, verify)


export default router