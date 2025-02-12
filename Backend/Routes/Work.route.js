import express from 'express'
import { addWorkInfo, home } from '../Controllers/Work.controller.js';
import secureRoute from '../Middleware/secureRoute.js';
const router=express.Router()
router.post("/addwork",secureRoute,addWorkInfo)
router.get("/home",secureRoute,home)
export default router;
