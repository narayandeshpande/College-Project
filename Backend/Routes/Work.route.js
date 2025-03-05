import express from 'express'
import { addWorkInfo, cancelWork, completeWork, home } from '../Controllers/Work.controller.js';
import secureRoute from '../Middleware/secureRoute.js';
const router=express.Router()
router.post("/addwork",secureRoute,addWorkInfo)
router.get("/home",secureRoute,home)
router.post("/completeWork",secureRoute,completeWork)
router.post("/cancelWork",secureRoute,cancelWork)
export default router;
