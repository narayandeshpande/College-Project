import express from 'express'
import { profile } from '../Controllers/Comman.controller.js';
import secureRoute from '../Middleware/secureRoute.js';

const route=express.Router()
route.post("/profile",secureRoute,profile)

export default route;