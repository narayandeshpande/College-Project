import express from 'express'
import { addWorkInfo } from '../Controllers/Work.controller.js';
const router=express.Router()
router.post("/addwork",addWorkInfo)
export default router;
