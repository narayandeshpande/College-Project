import express from 'express'
import { login, logout, sendOTP, Signup, updateProfile } from '../Controllers/User.controller.js';
import secureRoute from '../Middleware/secureRoute.js';
const router=express.Router()
router.post("/signup",Signup)
router.post("/emailotp",sendOTP)
router.post("/login",login)
router.get("/logout",logout)
router.post("/updateProfile",secureRoute,updateProfile)
export default router;
