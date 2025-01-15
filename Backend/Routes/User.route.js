import express from 'express'
import { login, logout, sendOTP, Signup } from '../Controllers/User.controller.js';
const router=express.Router()
router.post("/signup",Signup)
router.post("/emailotp",sendOTP)
router.post("/login",login)
router.get("/logout",logout)
export default router;
