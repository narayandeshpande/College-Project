import express from 'express'
import { acceptWork, allAcceptedWork, allCreatedWork, login, logout, sendOTP, signup, updateProfile } from '../Controllers/Bramhin.controller.js';
import secureRoute from '../Middleware/secureRoute.js';


const router=express.Router()
router.post("/signup",signup);
router.post("/sendotp",sendOTP);
router.post('/login',login);
router.get('/logout',logout);
router.post('/acceptwork',secureRoute,acceptWork)
router.get('/allacceptedwork',secureRoute,allAcceptedWork)
router.get('/allcreatework',secureRoute,allCreatedWork)
router.post('/updateProfile',secureRoute,updateProfile)
export default router;