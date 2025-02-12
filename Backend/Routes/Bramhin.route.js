import express from 'express'
import { acceptWork, login, logout, sendOTP, signup } from '../Controllers/Bramhin.controller.js';
import secureRoute from '../Middleware/secureRoute.js';


const router=express.Router()
router.post("/signup",signup);
router.post("/sendotp",sendOTP);
router.post('/login',login);
router.get('/logout',logout);
router.post('/acceptwork',secureRoute,acceptWork)
export default router;