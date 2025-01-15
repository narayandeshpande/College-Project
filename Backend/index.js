import express from "express"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose"
import Userroute from "../Backend/Routes/User.route.js"
import WorkRoute from '../Backend/Routes/Work.route.js'
const app = express()
app.use(cookieParser());
app.use(express.json())
dotenv.config()
app.use(cors(
        {
                origin:'http://localhost:5173',
                credentials:true
        }
))
const port = process.env.PORT || 4000
const mongourl=process.env.MONGOURL
try {
        mongoose.connect(mongourl)
        console.log("Connect to DB");
        
} catch (error) {
        console.log("error in conectivity"+error);
        
}


app.use("/user",Userroute);
app.use("/work",WorkRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})