import express from 'express'
import { login, logout, sendOTP, signup } from '../Controllers/Bramhin.controller.js';


const router=express.Router()
router.post("/signup",signup);
router.post("/sendotp",sendOTP);
router.post('/login',login);
router.get('/logout',logout);
export default router;