import mongoose from "mongoose";
const workInfoSchema=mongoose.Schema({
        workname:{
                type:String,
                require:true
        },
        date:{
                type:Date,
                require:true
        },
        stime:{
                type:String,
                require:true
        },
        ftime:{
                type:String,
                require:true
        },
        place:{
                type:String,
                require:true
        },
        money:{
                type:String,
                require:true
        },
        phone:{
                type:String,
                require:true
        },
        maplink:{
                type:String,
                require:true
        },
        noOfBraman:{
                type:String,
                require:true
        },
        noOfBramanrequired:{
                type:Number,
                require:true
        },
        noOfBramanweave:{
                type:Number,
                require:true
        },
        note:{
                type:String,
                require:false
        }
},{timestamps:true})
const workInfo=mongoose.model("Workinfo",workInfoSchema)
export default workInfo
